import Button from "../Button/Button";
import classes from "./EmployeeCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { Employee } from "../../types/types";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../../services/employeeService";

type Props = {
  employee: Employee;
};

const EmployeeCard = ({ employee }: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.iconCell}>
        <FontAwesomeIcon icon={faUser} className={classes.icon} />
      </div>

      <div className={classes.details}>
        <p>ID: {employee.id}</p>
        <p>
          <span>
            {employee.givenName} {employee.surname}
          </span>{" "}
          | {employee.role.roleType} | {employee.role.department.department}
        </p>
        <p>{employee.phone}</p>
        <p>{employee.email}</p>
        <p>{employee.address}</p>
      </div>

      <div className={classes.buttons_container}>
        <Link to={`/contracts/${employee.contracts[0].id}`} state={employee}>
          <Button variant="contract">Contract</Button>
        </Link>
        <Link to={`/employees/${employee.id}/edit`} state={employee}>
          <Button variant="update">Update</Button>
        </Link>
        <Link to={`/employees`}>
          <Button onSelect={() => deleteEmployee(employee.id)} variant="delete">
            Delete
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default EmployeeCard;
