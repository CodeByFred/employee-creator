import classes from "./EmployeeForm.module.scss";
import { useForm } from "react-hook-form";
import { employeeSchema, roleOptions } from "../../schemas/employee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

type EmployeeForm = z.infer<typeof employeeSchema>;

const EmployeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = (data: EmployeeForm) => {
    console.log(data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend>Employee Details</legend>
        <div className={classes.field}>
          <label>
            <FontAwesomeIcon icon={faUser} /> Given Name
          </label>
          <input {...register("givenName")} placeholder="Enter your given name" />
          <p>{errors.givenName?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Surname
          </label>
          <input {...register("surname")} placeholder="Enter your surname" />
          <p>{errors.surname?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Email
          </label>
          <input {...register("email")} placeholder="Enter your email address" />
          <p>{errors.email?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Phone Number
          </label>
          <input {...register("phone")} placeholder="Enter your phone number" />
          <p>{errors.phone?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Address
          </label>
          <input {...register("address")} placeholder="Enter your address" />
          <p>{errors.address?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Role
          </label>
          <select {...register("role")}>
            <option value="">Select a role</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <p>{errors.role?.message}</p>
        </div>

        <div className={classes.row}>
          <Button onSelect={() => open} variant="delete" type="reset">
            Clear
          </Button>
          <Button onSelect={() => open} variant="create" type="submit">
            Submit
          </Button>
        </div>
      </fieldset>
    </form>
  );
};
export default EmployeeForm;
