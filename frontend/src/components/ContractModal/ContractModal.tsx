import classes from "./ContractModal.module.scss";
import ContractForm from "../ContractForm/ContractForm";
import type { Employee } from "../../types/types";
import { useState } from "react";
import { getEmployeeById } from "../../services/employeeService";

type Props = {
  employee: Employee;
  closeModal: () => void;
};

const ContractModal = ({ employee, closeModal }: Props) => {
  const [employeeState, setEmployeeState] = useState(employee);

  const refreshEmployee = async () => {
    const updated = await getEmployeeById(employeeState.id);
    if (updated) {
      setEmployeeState(updated);
    }
  };

  const hasContracts =
    Array.isArray(employeeState.contracts) && employeeState.contracts.length > 0;

  const handleContractCreated = async () => {
    await refreshEmployee();
  };

  return (
    <div className={classes.container} onClick={closeModal}>
      <div className={classes.modal_info} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className={classes.close}>
          X
        </button>
        {hasContracts ? (
          <ContractForm
            defaultValues={employeeState.contracts[0]}
            employee={employeeState}
            readOnly
          />
        ) : (
          <>
            <ContractForm employee={employeeState} onSuccess={handleContractCreated} />
            <p>
              No contract found for {employeeState.givenName} {employeeState.surname}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default ContractModal;
