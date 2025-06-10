import { useEffect, useState } from "react";
import { getAllEmployees } from "../services/employeeService.ts";
import type { Employee } from "../types/types.ts";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getAllEmployees()
      .then(setEmployees)
      .catch((e) => console.log("Error loading employees", e));
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.givenName} {emp.surname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
