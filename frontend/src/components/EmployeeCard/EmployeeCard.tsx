import Button from "../Button/Button";
import classes from "./EmployeeCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { Employee, EmployeeSummary } from "../../types/types";
import { Link } from "react-router-dom";
import { formatRole } from "../../utils/utils";

type Props = {
  employee: EmployeeSummary;
  onArchive: (id: number) => void | Promise<void>;
  onContractRole: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
};

const EmployeeCard = ({ employee, onArchive, onContractRole, onEdit }: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.iconCell}>
        <FontAwesomeIcon icon={faUser} className={classes.icon} />
      </div>

      <div className={classes.details}>
        {/* <p>ID: {employee.id}</p> */}
        <p>
          <span>
            {employee.givenName} {employee.surname}{" "}
          </span>
          | {formatRole(employee.role)} | {formatRole(employee.department)}
        </p>
        <p>{employee.phone}</p>
        <p>{employee.email}</p>
        <p>{employee.address}</p>
      </div>

      <div className={classes.buttons_container}>
        <Button variant="update" onClick={() => onEdit(employee)}>
          Edit Details
        </Button>

        <Button variant="contract" onClick={() => onContractRole(employee)}>
          Contracts / Roles
        </Button>

        <Link to={`/employees`} state={employee}>
          <Button onClick={() => onArchive(employee.id)} variant="delete">
            Archive
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default EmployeeCard;
