import classes from "./ContractModal.module.scss";
import ContractForm from "../ContractForm/ContractForm";
import { useEffect, useState } from "react";
import { getEmployeeContractsByEmployeeId } from "../../services/contractService";
import type { ContractsForEmployeeResponse, EmployeeSummary } from "../../types/types";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  employee: EmployeeSummary;
  closeModal: () => void;
};

const ContractModal = ({ employee, closeModal }: Props) => {
  const [activeContract, setActiveContract] =
    useState<ContractsForEmployeeResponse | null>(null);

  useEffect(() => {
    getEmployeeContractsByEmployeeId(employee.id).then((contracts) => {
      if (contracts) {
        const active = contracts.find((c) => c.hasActiveContract) ?? null;
        setActiveContract(active);
      }
    });
  }, [employee.id]);

  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.modal_info} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className={classes.close}>
          X
        </button>
        {activeContract ? (
          <ContractForm defaultValues={activeContract} onFormSubmit={() => {}} readOnly />
        ) : (
          <>
            <ContractForm disableSubmit={employee != null} onFormSubmit={() => {}} />
            <p>
              No active contract found for {employee.givenName} {employee.surname}
            </p>
          </>
        )}
        <div className={classes.row}>
          <Button variant="contract">View History</Button>
          {!activeContract && (
            <Button
              variant="update"
              onClick={() =>
                navigate("/employees/create", { state: { employee: employee.id } })
              }
            >
              Create New Contract
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContractModal;
