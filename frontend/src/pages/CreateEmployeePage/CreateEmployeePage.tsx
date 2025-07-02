import classes from "./CreateEmployeePage.module.scss";
import Banner from "../../components/Banner/Banner";
import CreationWizard from "../../components/Wizard/CreateEmployeeFlow";
import AddContractRoleFlow from "../../components/Wizard/AddContractRoleFlow";
import { useLocation } from "react-router-dom";

const CreateEmployeePage = () => {
  const location = useLocation();
  const employee = (location.state as { employee?: number })?.employee;

  return (
    <div className={classes.container}>
      <Banner />
      {employee ? <AddContractRoleFlow employeeId={employee} /> : <CreationWizard />}
    </div>
  );
};
export default CreateEmployeePage;
