import classes from "./UpdateEmployeePage.module.scss";
import ContractForm from "../../components/ContractForm/ContractForm";
// import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Banner from "../../components/Banner/Banner";
import { useLocation } from "react-router-dom";

const UpdateEmployeePage = () => {
  const location = useLocation();
  const employee = location.state;

  return (
    <div className={classes.container}>
      <Banner />
      <div className={classes.forms}>
        {/* <EmployeeForm /> */}
        <ContractForm defaultValues={employee.contracts[0]} readOnly />
      </div>
    </div>
  );
};
export default UpdateEmployeePage;
