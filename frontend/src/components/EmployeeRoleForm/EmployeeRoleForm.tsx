import classes from "./EmployeeRoleForm.module.scss";
import type { z } from "zod/v4";
import { employeeRoleSchema } from "../../schemas/employeeRole.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formatEnum } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBuilding,
  faBusinessTime,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useDepartmentRoles } from "../../context/DepartmentRolesContext";
import Button from "../Button/Button";

type EmployeeRoleForm = z.infer<typeof employeeRoleSchema>;

type Props = {
  onFormSubmit: (data: EmployeeRoleForm) => unknown;
  defaultValues?: Partial<EmployeeRoleForm>;
};

const EmployeeRoleForm = ({ onFormSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeRoleForm>({
    resolver: zodResolver(employeeRoleSchema),
    defaultValues,
  });

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | "">("");
  const { departments } = useDepartmentRoles();
  const selectedDepartment = departments.find(
    (d) => d.departmentId === selectedDepartmentId
  );
  const roles = selectedDepartment?.roles || [];

  return (
    <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend>Employee Role Details</legend>
        <div className={classes.field}>
          <label htmlFor="department">
            <FontAwesomeIcon icon={faBuilding} className={classes.icon} />
            Department
          </label>
          <select
            id="department"
            value={selectedDepartmentId}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedDepartmentId(value ? Number(value) : "");
            }}
          >
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {formatEnum(dept.department)}
              </option>
            ))}
          </select>
          <div className={classes.field}>
            <label htmlFor="role">
              <FontAwesomeIcon icon={faBriefcase} className={classes.icon} />
              Role
            </label>
            <select
              {...register("roleId", { valueAsNumber: true })}
              id="role"
              disabled={!roles.length}
            >
              <option value="">Select a role</option>
              {roles
                .sort((a, b) => a.roleType.localeCompare(b.roleType))
                .map((role) => (
                  <option key={role.roleId} value={role.roleId}>
                    {formatEnum(role.roleType)}
                  </option>
                ))}
            </select>
            <p>{errors.roleId?.message}</p>
          </div>

          <div className={classes.field}>
            <label htmlFor="years">
              <FontAwesomeIcon icon={faBusinessTime} className={classes.icon} />
              Years of Experience
            </label>
            <input
              {...register("priorYearsOfExperience", { valueAsNumber: true })}
              placeholder="Prior Years of Experience in Role"
              id="years"
            />
            <p>{errors.priorYearsOfExperience?.message}</p>
          </div>

          <div className={classes.radio}>
            <label className={classes.label_title} htmlFor="promotion">
              <FontAwesomeIcon icon={faClock} className={classes.icon} />
              Promotion Type
            </label>
            <div className={classes.row}>
              <label>
                <input type="radio" value="NONE" {...register("promotionType")} />
                New Employee
              </label>
              <label>
                <input type="radio" value="PROMOTION" {...register("promotionType")} />
                Promotion
              </label>
              <label>
                <input type="radio" value="LATERAL" {...register("promotionType")} />
                Lateral
              </label>
              <label>
                <input type="radio" value="DEMOTION" {...register("promotionType")} />
                Demotion
              </label>
            </div>
            <p>{errors.promotionType?.message}</p>
          </div>

          <div className={classes.field}>
            <label htmlFor="rating">
              <FontAwesomeIcon icon={faBusinessTime} className={classes.icon} />
              Performance Rating
            </label>
            <select {...register("performanceRating", { valueAsNumber: true })}>
              <option value="0">New Employee</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
            <p>{errors.performanceRating?.message}</p>
          </div>
        </div>
        <Button variant="create" type="submit">
          Submit
        </Button>
      </fieldset>
    </form>
  );
};
export default EmployeeRoleForm;
