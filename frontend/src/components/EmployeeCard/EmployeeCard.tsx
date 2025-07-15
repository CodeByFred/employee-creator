import Button from "../Button/Button";
import classes from "./EmployeeCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { Employee, EmployeeSummary } from "../../types/types";
import { formatEnum } from "../../utils/utils";
import { useState } from "react";

type Props = {
  employee: EmployeeSummary;
  onArchive: (id: number) => void | Promise<void>;
  onDelete: (id: number) => void | Promise<void>;
  onContractRole: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
};

const EmployeeCard = ({
  employee,
  onArchive,
  onDelete,
  onContractRole,
  onEdit,
}: Props) => {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.iconCell}>
        <FontAwesomeIcon icon={faUser} className={classes.icon} />
      </div>

      <div className={classes.details}>
        <p>
          <span>
            {employee.givenName} {employee.surname}{" "}
          </span>
          | {formatEnum(employee.role)} | {formatEnum(employee.department)}
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

        {/* activating modal to select deletion type (not calling the achive/delete function yet) */}
        <Button variant="delete" onClick={() => setConfirming(true)}>
          Archive
        </Button>
      </div>

      {/* confirmation modal */}
      {confirming && (
        <div className={classes.confirmOverlay} onClick={() => setConfirming(false)}>
          <div className={classes.confirmBox} onClick={(e) => e.stopPropagation()}>
            <p>
              Are you sure you want to archive{" "}
              <strong>
                {employee.givenName} {employee.surname}
              </strong>
              ?
            </p>
            <div className={classes.confirmButtons}>
              <Button variant="contract" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
              <Button
                variant="create"
                onClick={() => {
                  onArchive(employee.id);
                  setConfirming(false);
                }}
              >
                Yes
              </Button>
              <Button
                variant="delete"
                onClick={() => {
                  onDelete(employee.id);
                  setConfirming(false);
                }}
              >
                Delete Employee
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EmployeeCard;
