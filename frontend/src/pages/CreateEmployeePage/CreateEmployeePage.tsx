import { useState } from "react";
import classes from "./CreateEmployeePage.module.scss";
import ContractForm from "../../components/ContractForm/ContractForm";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Banner from "../../components/Banner/Banner";
import { createEmployee } from "../../services/employeeService";

const CreateEmployeePage = () => {
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  const onFormSubmit = async (data: EmployeeForm) => {
    try {
      const createdEmployee = await createEmployee(data);
      setEmployeeId(createdEmployee.id);
    } catch (e) {
      console.log("Failed to create employee", e);
    }
  };

  return (
    <div className={classes.container}>
      <Banner />
      <div className={classes.forms}>
        <EmployeeForm onFormSubmit={onFormSubmit} />
        {employeeId && <ContractForm employeeId={employeeId} />}
      </div>
    </div>
  );
};
export default CreateEmployeePage;
