import classes from "./ContractModal.module.scss";
import ContractForm from "../ContractForm/ContractForm";
import type { Employee } from "../../types/types";
import { useNavigate } from "react-router-dom";

type Props = {
  employee: Employee;
  closeModal: () => void;
};

const ContractModal = ({ employee, closeModal }: Props) => {
  const hasContracts = Array.isArray(employee.contracts) && employee.contracts.length > 0;

  const navigate = useNavigate();

  const handleContractCreated = () => {
    navigate("/employees");
  };

  return (
    <div className={classes.container} onClick={closeModal}>
      <div className={classes.modal_info} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className={classes.close}>
          X
        </button>
        {hasContracts ? (
          <ContractForm
            defaultValues={employee.contracts[0]}
            employee={employee}
            readOnly
          />
        ) : (
          <>
            <ContractForm employee={employee} onSuccess={handleContractCreated} />
            <p>No contract found for this employee.</p>
          </>
        )}
      </div>
    </div>
  );
};
export default ContractModal;
