import Button from "../Button/Button";
import classes from "./EmployeeCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { Contract, Employee } from "../../types/types";
import { Link } from "react-router-dom";
import { formatRole } from "../../utils/utils";

type Props = {
  employee: Employee;
  onSelect: (id: number) => void | Promise<void>;
  setEmployeeContract: (contracts: Contract[]) => void;
};

const EmployeeCard = ({ employee, onSelect, setEmployeeContract }: Props) => {
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
        <Link to={`/employees/edit/${employee.id}`} state={employee}>
          <Button variant="update">Update</Button>
        </Link>

        <Button
          variant="contract"
          onClick={() => {
            setEmployeeContract(employee.contracts);
          }}
        >
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
