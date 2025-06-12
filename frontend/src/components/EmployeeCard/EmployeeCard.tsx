import Button from "../Button/Button";
import classes from "./EmployeeCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { Employee } from "../../types/types";
import { Link } from "react-router-dom";
import { formatRole } from "../../utils/utils";

type Props = {
  employee: Employee;
  onSelect: (id: number) => void | Promise<void>;
  onViewContract: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
};

const EmployeeCard = ({ employee, onSelect, onViewContract, onEdit }: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.iconCell}>
        <FontAwesomeIcon icon={faUser} className={classes.icon} />
      </div>

      <div className={classes.details}>
        <p>ID: {employee.id}</p>
        <p>
          <span>
            {employee.givenName} {employee.surname}{" "}
          </span>
          | {formatRole(employee.role.roleType)} |{" "}
          {formatRole(employee.role.department.department)}
        </p>
        <p>{employee.phone}</p>
        <p>{employee.email}</p>
        <p>{employee.address}</p>
      </div>

      <div className={classes.buttons_container}>
        <Button variant="update" onClick={() => onEdit(employee)}>
          Update
        </Button>

        <Button variant="contract" onClick={() => onViewContract(employee)}>
          View Contracts
        </Button>

        <Link to={`/employees`} state={employee}>
          <Button onClick={() => onSelect(employee.id)} variant="delete">
            Delete
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default EmployeeCard;
