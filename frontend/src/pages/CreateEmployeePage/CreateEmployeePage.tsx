import classes from "./CreateEmployeePage.module.scss";
import ContractForm from "../../components/ContractForm/ContractForm";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";

const CreateEmployeePage = () => {
  return (
    <div className={classes.container}>
      <EmployeeForm />
      <ContractForm />
    </div>
  );
};
export default CreateEmployeePage;
