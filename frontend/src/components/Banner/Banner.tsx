import classes from "./Banner.module.scss";

const Banner = () => {
  return (
    <div className={classes.banner}>
        <p>Team Tracker</p>
        <button>Add New Employee</button>
    </div>
  )
}
export default Banner