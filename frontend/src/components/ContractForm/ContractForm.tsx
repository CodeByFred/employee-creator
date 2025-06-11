import classes from "./ContractForm.module.scss";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { contractSchema } from "../../schemas/contract.schema";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

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
      <fieldset className={classes.fieldset}>
        <legend>Contract Details</legend>

        <div className={classes.radio}>
          <label className={classes.label_title}>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Contract Type
          </label>
          <div className={classes.row}>
            <label>
              <input type="radio" value="PERMANENT" {...register("contractType")} />
              Permanent
            </label>
            <label>
              <input type="radio" value="CONTRACT" {...register("contractType")} />
              Contract
            </label>
          </div>
          <p>{errors.contractType?.message}</p>
        </div>

        <div className={classes.radio}>
          <label className={classes.label_title}>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Employment Type
          </label>
          <div className={classes.row}>
            <label>
              <input
                type="radio"
                value="FULL_TIME"
                {...register("contractEmploymentType")}
              />
              Full-Time
            </label>
            <label>
              <input
                type="radio"
                value="PART_TIME"
                {...register("contractEmploymentType")}
              />
              Part-Time
            </label>
          </div>
          <p>{errors.contractEmploymentType?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            {" "}
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Start Date
          </label>
          <input type="date" {...register("startDate")} />
          <p>{errors.startDate?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            {" "}
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Finish Date
          </label>
          <input type="date" {...register("finishDate")} />
          <p>{errors.finishDate?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Role
          </label>
          <input {...register("hours")} placeholder="Hours per week" />
          <p>{errors.hours?.message}</p>
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
export default ContractForm;
