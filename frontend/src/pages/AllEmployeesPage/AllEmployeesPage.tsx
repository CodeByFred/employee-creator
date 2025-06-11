import classes from "./AllEmployeesPage.module.scss";
import { useState, useEffect } from "react";
import { deleteEmployee, getAllEmployees } from "../../services/employeeService";
import type { Employee } from "../../types/types";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Banner from "../../components/Banner/Banner";

const AllEmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

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
          />
        ))}
      </div>
    </div>
  );
};
export default AllEmployeesPage;
