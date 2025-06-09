import Button from "../Button/Button";
import Title from "../Title/Title";
import classes from "./Banner.module.scss";


const Banner = () => {
  return (
    <div className={classes.banner}>
        <Title>Team Tracker</Title>
        <Button onSelect={() => open} variant="create">Add New Employee</Button>
    </div>
  )
}
export default Banner