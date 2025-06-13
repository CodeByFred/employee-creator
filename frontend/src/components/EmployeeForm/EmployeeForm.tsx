import classes from "./EmployeeForm.module.scss";
import { useForm } from "react-hook-form";
import { employeeSchema } from "../../schemas/employee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faEnvelope,
  faLocationDot,
  faPeopleGroup,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import type { Role } from "../../types/types";
import { useEffect, useState } from "react";
import { getAllRoles } from "../../services/roleService";
import { formatRole } from "../../utils/utils";

type EmployeeForm = z.infer<typeof employeeSchema>;

type Props = {
  onFormSubmit: (data: EmployeeForm) => unknown;
  defaultValues?: EmployeeForm;
};

const EmployeeForm = ({ onFormSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getAllRoles();
      if (data) {
        setRoles(data);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (roles.length && defaultValues) {
      reset(defaultValues);
    }
  }, [roles, defaultValues, reset]);

  return (
    <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend>Employee Details</legend>
        <div className={classes.field}>
          <label htmlFor="gName">
            <FontAwesomeIcon icon={faUser} /> Given Name
          </label>
          <input
            {...register("givenName")}
            id="gName"
            placeholder="Enter your given name"
          />
          <p>{errors.givenName?.message}</p>
        </div>

        <div className={classes.field}>
          <label htmlFor="sName">
            <FontAwesomeIcon icon={faPeopleGroup} className={classes.icon} />
            Surname
          </label>
          <input {...register("surname")} id="sName" placeholder="Enter your surname" />
          <p>{errors.surname?.message}</p>
        </div>

        <div className={classes.field}>
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            placeholder="Enter your email address"
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className={classes.field}>
          <label htmlFor="phone">
            <FontAwesomeIcon icon={faPhone} className={classes.icon} />
            Phone Number
          </label>
          <input
            {...register("phone")}
            id="phone"
            placeholder="Enter your phone number"
          />
          <p>{errors.phone?.message}</p>
        </div>

        <div className={classes.field}>
          <label htmlFor="address">
            <FontAwesomeIcon icon={faLocationDot} className={classes.icon} />
            Address
          </label>
          <input {...register("address")} id="address" placeholder="Enter your address" />
          <p>{errors.address?.message}</p>
        </div>

        <div className={classes.field}>
          <label htmlFor="role">
            <FontAwesomeIcon icon={faBriefcase} className={classes.icon} />
            Role
          </label>
          <select {...register("roleId", { valueAsNumber: true })} id="role">
            <option value="">Select a role</option>
            {[...roles]
              .sort((a, b) => a.roleType.localeCompare(b.roleType))
              .map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {formatRole(role.roleType)} ({formatRole(role.department.department)})
                </option>
              ))}
          </select>
          <p>{errors.roleId?.message}</p>
        </div>

        <div className={classes.row}>
          <Button variant="delete" type="reset">
            Clear
          </Button>
          <Button variant="create" type="submit">
            Submit
          </Button>
        </div>
      </fieldset>
    </form>
  );
};
export default EmployeeForm;
