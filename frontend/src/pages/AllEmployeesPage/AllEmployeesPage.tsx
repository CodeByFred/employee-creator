import classes from "./AllEmployeesPage.module.scss";
import { useState, useEffect } from "react";
import { deleteEmployee, getAllEmployees } from "../../services/employeeService";
import type { Employee } from "../../types/types";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Banner from "../../components/Banner/Banner";
import ContractModal from "../../components/ContractModal/ContractModal";
import EmployeeModal from "../../components/EmployeeModal/EmployeeModal";

const AllEmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [contractModalEmployee, setContractModalEmployee] = useState<Employee | null>(
    null
  );
  const [updateModalEmployee, setUpdateModalEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    getAllEmployees()
      .then(setEmployees)
      .catch((e) => console.log("Error loading employees", e));
  }, []);

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    const updated = await getAllEmployees();
    setEmployees(updated);
  };

  return (
    <div className={classes.container}>
      <Banner />
      <div className={classes.card}>
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onSelect={() => handleDelete(employee.id)}
            onViewContract={() => setContractModalEmployee(employee)}
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
