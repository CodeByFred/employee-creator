import Button from "../Button/Button";
import classes from "./EmployeeCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { Employee } from "../../types/types";

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
        <Button onSelect={() => open} variant="contract" type="button">
          Contract
        </Button>
        <Button onSelect={() => open} variant="update" type="button">
          Update
        </Button>
        <Button onSelect={() => open} variant="delete" type="button">
          Delete
        </Button>
      </div>
    </div>
  );
};
export default EmployeeCard;
