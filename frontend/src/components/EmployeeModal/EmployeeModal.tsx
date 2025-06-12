import classes from "./EmployeeModal.module.scss";
import type { Employee } from "../../types/types";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { updateEmployee } from "../../services/employeeService";

type Props = {
  employee: Employee;
  closeModal: () => void;
};

const EmployeeModal = ({ employee, closeModal }: Props) => {
  const mapEmployeeToForm = (employee: Employee): EmployeeForm => ({
    givenName: employee.givenName,
    surname: employee.surname,
    email: employee.email,
    phone: employee.phone,
    address: employee.address,
    roleId: employee.role.roleId,
  });

  const onFormSubmit = async (data: EmployeeForm) => {
    try {
      updateEmployee(data, employee.id);
    } catch (e) {
      console.log("Failed to update employee", e);
    }
  };

  return (
    <div className={classes.container} onClick={closeModal}>
      <div className={classes.modal_info} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className={classes.close}>
          X
        </button>
        <EmployeeForm
          defaultValues={mapEmployeeToForm(employee)}
          onFormSubmit={onFormSubmit}
        />
      </div>
    </div>
  );
};
export default EmployeeModal;
