import classes from "./EmployeeForm.module.scss";
import { useForm } from "react-hook-form";
import { employeeSchema } from "../../schemas/employee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPeopleGroup,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

type EmployeeForm = z.infer<typeof employeeSchema>;

type Props = {
  onFormSubmit: (data: EmployeeForm) => unknown;
  defaultValues?: Partial<EmployeeForm>;
  closeModal?: () => void;
};

const EmployeeForm = ({ onFormSubmit, defaultValues, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

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
        <div className={classes.row}>
          <Button variant="delete" onClick={closeModal}>
            Cancel
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
