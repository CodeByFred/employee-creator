import classes from "./ContractForm.module.scss";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { contractSchema } from "../../schemas/contract.schema";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { createContract } from "../../services/contractService";
import type { Employee } from "../../types/types";

type ContractForm = z.infer<typeof contractSchema>;

type Props = {
  defaultValues?: ContractForm;
  readOnly?: boolean;
  employee: Employee;
  onSuccess?: () => void;
};

const ContractForm = ({ defaultValues, readOnly = false, employee }: Props) => {
  const employeeId = employee.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContractForm>({
    resolver: zodResolver(contractSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContractForm) => {
    try {
      const contractWithEmployeeId = {
        ...data,
        employeeId,
      };
      await createContract(contractWithEmployeeId);
    } catch (e) {
      console.log("Failed to create contract:", e);
    }
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
              <input
                type="radio"
                value="PERMANENT"
                {...register("contractType")}
                disabled={readOnly}
              />
              Permanent
            </label>
            <label>
              <input
                type="radio"
                value="CONTRACT"
                {...register("contractType")}
                disabled={readOnly}
              />
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
                disabled={readOnly}
              />
              Full-Time
            </label>
            <label>
              <input
                type="radio"
                value="PART_TIME"
                {...register("contractEmploymentType")}
                disabled={readOnly}
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
          <input type="date" {...register("startDate")} disabled={readOnly} />
          <p>{errors.startDate?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            {" "}
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Finish Date
          </label>
          <input type="date" {...register("finishDate")} disabled={readOnly} />
          <p>{errors.finishDate?.message}</p>
        </div>

        <div className={classes.field}>
          <label>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
            Number of Hours
          </label>
          <input
            {...register("hoursPerWeek", { valueAsNumber: true })}
            placeholder="Hours per week"
            disabled={readOnly}
          />
          <p>{errors.hoursPerWeek?.message}</p>
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
