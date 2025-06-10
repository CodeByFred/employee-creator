import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Title from "../Title/Title";
import classes from "./Banner.module.scss";

const Banner = () => {
  return (
    <div className={classes.banner}>
      <Title>Team Tracker</Title>
      <Link to="/employees/create">
        <Button variant="create">Add New Employee</Button>
      </Link>
    </div>
  );
};
export default Banner;
