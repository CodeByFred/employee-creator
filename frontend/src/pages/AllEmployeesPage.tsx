import { useState, useEffect } from "react";
import { getAllEmployees } from "../services/employeeService";
import type { Employee } from "../types/types";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";
import Banner from "../components/Banner/Banner";

const AllEmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getAllEmployees()
      .then(setEmployees)
      .catch((e) => console.log("Error loading employees", e));
  }, []);

  return (
    <div>
      <Banner></Banner>
      <div>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};
export default AllEmployeesPage;
