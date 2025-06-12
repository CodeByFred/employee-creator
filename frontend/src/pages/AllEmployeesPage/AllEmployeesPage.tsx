import classes from "./AllEmployeesPage.module.scss";
import { useState, useEffect } from "react";
import { deleteEmployee, getAllEmployees } from "../../services/employeeService";
import type { Contract, Employee } from "../../types/types";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Banner from "../../components/Banner/Banner";
import ContractModal from "../../components/ContractModal/ContractModal";

const AllEmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeContracts, setEmployeeContracts] = useState<Contract[]>([]);

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
            setEmployeeContract={setEmployeeContracts}
          />
        ))}
      </div>

      {employeeContracts.length > 0 && (
        <ContractModal
          contracts={employeeContracts}
          closeModal={() => setEmployeeContracts([])}
        />
      )}
    </div>
  );
};
export default AllEmployeesPage;
