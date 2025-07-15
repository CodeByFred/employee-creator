import classes from "./AllEmployeesPage.module.scss";
import { useState, useEffect, useMemo } from "react";
import {
  deleteEmployee,
  getAllEmployees,
  toggleIsActive,
} from "../../services/employeeService";
import type { EmployeeSummary } from "../../types/types";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Banner from "../../components/Banner/Banner";
import ContractModal from "../../components/ContractModal/ContractModal";
import EmployeeModal from "../../components/EmployeeModal/EmployeeModal";

const AllEmployeesPage = () => {
  const [employees, setEmployees] = useState<EmployeeSummary[]>([]);

  const [contractModalEmployee, setContractModalEmployee] =
    useState<EmployeeSummary | null>(null);
  const [updateModalEmployee, setUpdateModalEmployee] = useState<EmployeeSummary | null>(
    null
  );

  // toolbar state
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"NAME_A" | "NAME_D">("NAME_A");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  // fetch once for all employees
  useEffect(() => {
    (async () => {
      const data = await getAllEmployees();
      if (data) setEmployees(data);
    })();
  }, []);

  const handleDelete = async (id: number) => {
    const success = await deleteEmployee(id);
    if (!success) return;

    const updated = await getAllEmployees();
    if (updated) setEmployees(updated);
  };

  // extract unique departments for the dropdown
  const departments = useMemo(() => {
    const all = Array.from(new Set(employees.map((e) => e.department)));
    return ["ALL", ...all];
  }, [employees]);

  // extract unique roles for the dropdown
  const roles = useMemo(() => {
    const all = Array.from(new Set(employees.map((e) => e.role)));
    return ["ALL", ...all];
  }, [employees]);

  // apply search, filter, sort
  const visible = useMemo(() => {
    let list = employees;

    // search for name
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter((e) => `${e.givenName} ${e.surname}`.toLowerCase().includes(q));
    }

    // department filter
    if (deptFilter !== "ALL") {
      list = list.filter((e) => e.department === deptFilter);
    }

    // role filter
    if (roleFilter !== "ALL") {
      list = list.filter((e) => e.role === roleFilter);
    }

    // status filter
    if (statusFilter === "ACTIVE") {
      list = list.filter((e) => e.isActive);
    } else if (statusFilter === "INACTIVE") {
      list = list.filter((e) => !e.isActive);
    }

    // sorting
    list = [...list].sort((a, b) => {
      if (sortBy === "NAME_A") {
        return (
          a.surname.localeCompare(b.surname) || a.givenName.localeCompare(b.givenName)
        );
      } else if (sortBy === "NAME_D") {
        return (
          b.surname.localeCompare(a.surname) || b.givenName.localeCompare(a.givenName)
        );
      }
      // ROLE
      return a.role.localeCompare(b.role);
    });

    return list;
  }, [employees, searchTerm, deptFilter, roleFilter, sortBy, statusFilter]);

  // toggle active/inactive
  const handleArchive = async (id: number) => {
    const ok = await toggleIsActive(id);
    if (!ok) return;
    const updated = await getAllEmployees();
    if (updated) setEmployees(updated);
  };

  return (
    <div className={classes.container}>
      <Banner />

      {/* ───────────────────────── Toolbar ───────────────────────── */}

      <div className={classes.toolbar}>
        <input
          type="search"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* department dropdown is disabled if a role is selected */}
        <select
          value={deptFilter}
          onChange={(e) => {
            setDeptFilter(e.target.value);
            // reset the other filter when you pick one
            if (e.target.value !== "ALL") setRoleFilter("ALL");
          }}
          disabled={roleFilter !== "ALL"}
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d === "ALL" ? "All Departments" : d}
            </option>
          ))}
        </select>

        {/* role dropdown is disabled if a department is selected */}
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            if (e.target.value !== "ALL") setDeptFilter("ALL");
          }}
          disabled={deptFilter !== "ALL"}
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r === "ALL" ? "All Roles" : r}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as never)}>
          <option value="NAME_A">Name A-Z</option>
          <option value="NAME_D">Name Z-A</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as never)}
        >
          <option value="ALL">All Employees</option>
          <option value="ACTIVE">Active Only</option>
          <option value="INACTIVE">Inactive Only</option>
        </select>
      </div>

      {/* ───────────────────────── Cards ─────────────────────────── */}
      <div className={classes.card}>
        {visible.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onArchive={() => handleArchive(emp.id)}
            onContractRole={() => setContractModalEmployee(emp)}
            onEdit={() => setUpdateModalEmployee(emp)}
            onDelete={() => handleDelete(emp.id)}
          />
        ))}
      </div>

      {/* ───────────────────────── Modals ────────────────────────── */}
      {contractModalEmployee && (
        <ContractModal
          employee={contractModalEmployee}
          closeModal={() => setContractModalEmployee(null)}
        />
      )}
      {updateModalEmployee && (
        <EmployeeModal
          employee={updateModalEmployee}
          closeModal={() => setUpdateModalEmployee(null)}
        />
      )}
    </div>
  );
};

export default AllEmployeesPage;
