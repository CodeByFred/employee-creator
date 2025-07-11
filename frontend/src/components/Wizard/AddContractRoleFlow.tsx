import { useState } from "react";
import { z } from "zod/v4";
import { useNavigate } from "react-router";
import Button from "../Button/Button";
import ContractForm from "../ContractForm/ContractForm";
import EmployeeRoleForm from "../EmployeeRoleForm/EmployeeRoleForm";
import ReviewForm from "../ReviewForm/ReviewForm";
import { contractSchema } from "../../schemas/contract.schema";
import { employeeRoleSchema } from "../../schemas/employeeRole.schema";
import { createContract } from "../../services/contractService";
import { createEmployeeRole } from "../../services/employeeRoleService";

type Props = { employeeId: number };

const steps = ["contract", "role", "review"] as const;
type Step = (typeof steps)[number];

export default function AddContractRoleFlow({ employeeId }: Props) {
  const [step, setStep] = useState<Step>("contract");
  const [contractData, setContractData] = useState<z.input<typeof contractSchema>>();
  const [roleData, setRoleData] = useState<z.infer<typeof employeeRoleSchema>>();
  const navigate = useNavigate();

  const next = () => setStep((s) => steps[steps.indexOf(s) + 1] as Step);
  const back = () => setStep((s) => steps[steps.indexOf(s) - 1] as Step);

  const onContractSubmit = (data: z.input<typeof contractSchema>) => {
    setContractData(data);
    next();
  };

  const onRoleSubmit = (data: z.infer<typeof employeeRoleSchema>) => {
    setRoleData(data);
    next();
  };

  const onFinalSubmit = async () => {
    if (!contractData || !roleData) return;

    const createdContract = await createContract({
      ...contractData,
      employeeId,
    });
    if (!createdContract?.id) {
      return;
    }

    const createdRole = await createEmployeeRole({
      ...roleData,
      contractId: createdContract.id,
    });
    if (!createdRole?.id) {
      return;
    }

    navigate("/employees");
  };

  return (
    <>
      {step === "contract" && (
        <ContractForm onFormSubmit={onContractSubmit} defaultValues={contractData} />
      )}

      {step === "role" && (
        <EmployeeRoleForm onFormSubmit={onRoleSubmit} defaultValues={roleData} />
      )}

      {step === "review" && (
        <ReviewForm
          contract={contractData!}
          employeeRole={roleData!}
          onFinalSubmit={onFinalSubmit}
        />
      )}

      <>
        {step !== "contract" && (
          <Button variant="contract" onClick={back}>
            Back
          </Button>
        )}
        <Button variant="delete" onClick={() => navigate("/employees")}>
          Cancel
        </Button>
      </>
    </>
  );
}
