import classes from './EmployeeForm.module.scss';
import {useForm} from "react-hook-form";
import { employeeSchema, roleOptions } from "../../schemas/employee.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';
import Button from '../Button/Button';

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
      <input {...register("givenName")} placeholder="Given Name" />
      {errors.givenName && <p>{errors.givenName.message}</p>}

      <input {...register("surname")} placeholder="Surname" />
      {errors.surname && <p>{errors.surname.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("phone")} placeholder="Phone" />
      {errors.phone && <p>{errors.phone.message}</p>}

      <input {...register("address")} placeholder="Address" />
      {errors.address && <p>{errors.address.message}</p>}

      <select {...register("role")}>
        <option value="">Select a role</option>
        {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
        {errors.role && <p>{errors.role.message}</p>}
      </select>


      <div className={classes.row}>
        <Button onSelect={() => open} variant='delete' type="reset" >Clear</Button>
        <Button onSelect={() => open} variant='create'type="submit" >Submit</Button>
      </div>
    </form>
  );
}
export default EmployeeForm