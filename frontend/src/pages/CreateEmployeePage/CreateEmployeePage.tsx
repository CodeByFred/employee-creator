import classes from "./CreateEmployeePage.module.scss";
import Banner from "../../components/Banner/Banner";

import CreateEmployeeFlow from "../../components/Wizard/CreateEmployeeWizard";

const CreateEmployeePage = () => {
  return (
    <div className={classes.container}>
      <Banner />
      <CreateEmployeeFlow />
    </div>
  );
};
export default CreateEmployeePage;
