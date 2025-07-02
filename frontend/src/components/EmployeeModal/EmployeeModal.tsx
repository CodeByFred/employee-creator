import classes from "./EmployeeModal.module.scss";
import type { Employee } from "../../types/types";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { updateEmployee } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";

type Props = {
  employee: Employee;
  closeModal: () => void;
};

const EmployeeModal = ({ employee, closeModal }: Props) => {
  const navigate = useNavigate();

  const onFormSubmit = async (data: EmployeeForm) => {
    const result = await updateEmployee(data, employee.id);
    if (result !== undefined) {
      navigate("/employees");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.modal_info} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className={classes.close}>
          X
        </button>
        <EmployeeForm defaultValues={employee} onFormSubmit={onFormSubmit} />
      </div>
    </div>
  );
};
export default EmployeeModal;
