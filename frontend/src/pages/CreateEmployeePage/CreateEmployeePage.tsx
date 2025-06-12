import classes from "./CreateEmployeePage.module.scss";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Banner from "../../components/Banner/Banner";
import { createEmployee } from "../../services/employeeService";
import { useState } from "react";
import type { Employee } from "../../types/types";
import ContractModal from "../../components/ContractModal/ContractModal";
import { useNavigate } from "react-router-dom";

const CreateEmployeePage = () => {
  const [createdEmployee, setCreatedEmployee] = useState<Employee | null>(null);

  const navigate = useNavigate();

  const onFormSubmit = async (data: EmployeeForm) => {
    try {
      const newEmployee = await createEmployee(data);
      setCreatedEmployee(newEmployee);
    } catch (e) {
      console.log("Failed to create employee", e);
    }
  };

  return (
    <div className={classes.container}>
      <Banner />
      <div className={classes.forms}>
        <EmployeeForm onFormSubmit={onFormSubmit} />
        {createdEmployee && (
          <ContractModal
            employee={createdEmployee}
            closeModal={() => {
              setCreatedEmployee(null);
              navigate("/employees");
            }}
          />
        )}
      </div>
    </div>
  );
};
export default CreateEmployeePage;
