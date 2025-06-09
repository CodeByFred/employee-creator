import classes from "./ContractForm.module.scss";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { contractSchema } from "../../schemas/contract.schema";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";

type ContractForm = z.infer<typeof contractSchema>;

const ContractForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContractForm>({ resolver: zodResolver(contractSchema) });

  const onSubmit = (data: ContractForm) => {
    console.log(data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.row}>
        <label>
          <input type="radio" value="PERMANENT" {...register("contractType")} />
          Permanent
        </label>
        <label>
          <input type="radio" value="CONTRACT" {...register("contractType")} />
          Contract
        </label>
        {errors.contractType && <p>{errors.contractType.message}</p>}
      </div>

      <input type="date" {...register("startDate")} />
      {errors.startDate && <p>{errors.startDate.message}</p>}

      <input type="date" {...register("finishDate")} />
      {errors.finishDate && <p>{errors.finishDate.message}</p>}

      <div className={classes.row}>
        <label>
          <input type="radio" value="FULL_TIME" {...register("contractEmploymentType")} />
          Full-Time
        </label>
        <label>
          <input type="radio" value="PART_TIME" {...register("contractEmploymentType")} />
          Part-Time
        </label>
        {errors.contractEmploymentType && <p>{errors.contractEmploymentType.message}</p>}
      </div>

      <input {...register("hours")} placeholder="Hours per week" />
      {errors.hours && <p>{errors.hours.message}</p>}

      <div className={classes.row}>
        <Button onSelect={() => open} variant="delete" type="reset">
          Clear
        </Button>
        <Button onSelect={() => open} variant="create" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
export default ContractForm;
