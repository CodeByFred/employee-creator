import classes from "./ContractForm.module.scss";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { contractSchema } from "../../schemas/contract.schema";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContract } from "../../services/contractService";
import type { Employee } from "../../types/types";
import {
  faBusinessTime,
  faCalendarDays,
  faClock,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";

type ContractForm = z.infer<typeof contractSchema>;

type Props = {
  defaultValues?: ContractForm;
  readOnly?: boolean;
  employee: Employee;
  onSuccess?: () => void;
};

const ContractForm = ({
  defaultValues,
  readOnly = false,
  employee,
  onSuccess,
}: Props) => {
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
    const contractWithEmployeeId = {
      ...data,
      employeeId,
    };
    const result = await createContract(contractWithEmployeeId);
    if (result && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend>Contract Details</legend>

        <div className={classes.radio}>
          <label className={classes.label_title} htmlFor="contract">
            <FontAwesomeIcon icon={faFileSignature} className={classes.icon} />
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
          <label className={classes.label_title} htmlFor="employment">
            <FontAwesomeIcon icon={faClock} className={classes.icon} />
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
          <label htmlFor="startDate">
            {" "}
            <FontAwesomeIcon icon={faCalendarDays} className={classes.icon} />
            Start Date
          </label>
          <input
            type="date"
            {...register("startDate")}
            disabled={readOnly}
            id="startDate"
          />
          <p>{errors.startDate?.message}</p>
        </div>

        <div className={classes.field}>
          <label htmlFor="finishDate">
            {" "}
            <FontAwesomeIcon icon={faCalendarDays} className={classes.icon} />
            Finish Date
          </label>
          <input
            type="date"
            {...register("finishDate")}
            disabled={readOnly}
            id="finishDate"
          />
          <p>{errors.finishDate?.message}</p>
        </div>

        <div className={classes.field}>
          <label htmlFor="hours">
            <FontAwesomeIcon icon={faBusinessTime} className={classes.icon} />
            Number of Hours
          </label>
          <input
            {...register("hoursPerWeek", { valueAsNumber: true })}
            placeholder="Hours per week"
            disabled={readOnly}
            id="hours"
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
