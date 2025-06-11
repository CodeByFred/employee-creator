import classes from "./CreateEmployeePage.module.scss";
import ContractForm from "../../components/ContractForm/ContractForm";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Banner from "../../components/Banner/Banner";

const CreateEmployeePage = () => {
  return (
    <div className={classes.container}>
      <Banner />
      <div className={classes.forms}>
        <EmployeeForm />
        <ContractForm />
      </div>
    </div>
  );
};
export default CreateEmployeePage;
