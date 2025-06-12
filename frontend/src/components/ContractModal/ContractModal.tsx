import classes from "./ContractModal.module.scss";
import ContractForm from "../ContractForm/ContractForm";
import type { Contract } from "../../types/types";

type Props = {
  contracts: Partial<Contract[]>;
  closeModal: () => void;
};

const ContractModal = ({ contracts }: Props) => {
  const contract = [...contracts];

  console.log(contracts);

  return (
    <div className={classes.container}>
      <div className={classes.modal_info} onClick={(e) => e.stopPropagation()}>
        <button className={classes.close}>x</button>
        <div>
          {contracts.length > 0 && contract[0] && (
            <ContractForm
              defaultValues={contract[0]}
              employeeId={contract[0].employeeId}
              readOnly={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ContractModal;
