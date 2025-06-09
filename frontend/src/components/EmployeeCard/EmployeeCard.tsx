import Button from "../Button/Button";
import classes from "./EmployeeCard.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const EmployeeCard = () => {
  return (
    <div className={classes.container}>
        <FontAwesomeIcon icon={faUser} className={classes.icon}/>
        <div className={classes.text_container}>
            <p>ID: 1</p>
            <p><span>Samuel Hightower</span> | Developer | Engineering</p>
            <p>0123456789</p>
            <p>samuelhightower@aol.com</p>
            <p>123 Main Street Wollongong, NSW</p>
        </div>
        <div className={classes.button_container}>
            <Button onSelect={() => open} variant="contract">Contract</Button>
            <Button onSelect={() => open} variant="update">Update</Button>
            <Button onSelect={() => open} variant="delete">Delete</Button>
        </div>

    </div>
  )
}
export default EmployeeCard