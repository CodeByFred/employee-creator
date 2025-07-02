import type {
  ContractInput,
  EmployeeInput,
  RoleInput,
} from "../../context/CreateEmployeeContext";
import { formatEnum } from "../../utils/utils";
import Button from "../Button/Button";
import classes from "./ReviewForm.module.scss";
import { useDepartmentRoles } from "../../context/DepartmentRolesContext";

type ReviewProps = {
  employee?: EmployeeInput;
  contract: ContractInput;
  employeeRole: RoleInput;
  onFinalSubmit: () => void;
};

const ReviewForm = ({ employee, contract, employeeRole, onFinalSubmit }: ReviewProps) => {
  const { rolesById } = useDepartmentRoles();
  const lookup = rolesById[employeeRole.roleId];

  return (
    <div className={classes.review}>
      <fieldset className={classes.fieldset}>
        <legend>Review & Confirm</legend>
        {employee && (
          <section className={classes.section}>
            <h4>Employee Info</h4>
            <p>
              <strong>Name:</strong> {employee.givenName} {employee.surname}
            </p>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Phone:</strong> {employee.phone}
            </p>
            <p>
              <strong>Address:</strong> {employee.address}
            </p>
          </section>
        )}

        <section className={classes.section}>
          <h4>Contract Info</h4>
          <p>
            <strong>Type:</strong> {formatEnum(contract.contractType)}
          </p>
          <p>
            <strong>Employment:</strong> {formatEnum(contract.contractEmploymentType)}
          </p>
          <p>
            <strong>Start:</strong> {contract.startDate}
          </p>
          <p>
            <strong>Finish:</strong> {contract.finishDate || "N/A"}
          </p>
          <p>
            <strong>Hours/week:</strong> {contract.hoursPerWeek}
          </p>
        </section>

        <section className={classes.section}>
          <h4>Role Info</h4>
          <p>
            <strong>Deparment: </strong> {lookup.department}
          </p>
          <p>
            <strong>Role: </strong>
            {lookup.roleType}
          </p>
          {employee && (
            <p>
              <strong>Experience:</strong> {employeeRole.priorYearsOfExperience} years
            </p>
          )}
          {!employee && (
            <>
              <p>
                <strong>Promotion Type:</strong> {formatEnum(employeeRole.promotionType)}
              </p>
              <p>
                <strong>Performance Rating:</strong> {employeeRole.performanceRating}/5
              </p>
            </>
          )}
        </section>

        <div className={classes.actions}>
          <Button variant="create" onClick={onFinalSubmit}>
            Confirm & Submit
          </Button>
        </div>
      </fieldset>
    </div>
  );
};

export default ReviewForm;
