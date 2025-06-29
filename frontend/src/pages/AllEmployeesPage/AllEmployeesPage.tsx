import classes from "./AllEmployeesPage.module.scss";
import { useState, useEffect } from "react";
import { deleteEmployee, getAllEmployees } from "../../services/employeeService";
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

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getAllEmployees();
      if (data) setEmployees(data);
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id: number) => {
    const success = await deleteEmployee(id);
    if (!success) return;

    const updated = await getAllEmployees();
    if (updated) setEmployees(updated);
  };

  return (
    <div className={classes.container}>
      <Banner />
      <div className={classes.card}>
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onArchive={() => handleDelete(employee.id)}
            onContractRole={() => setContractModalEmployee(employee)}
            onEdit={() => setUpdateModalEmployee(employee)}
          />
        ))}
      </div>

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
