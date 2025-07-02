import { useState } from "react";
import { z } from "zod/v4";
import Button from "../Button/Button";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import ContractForm from "../ContractForm/ContractForm";
import EmployeeRoleForm from "../EmployeeRoleForm/EmployeeRoleForm";
import ReviewForm from "../ReviewForm/ReviewForm";
import { employeeSchema } from "../../schemas/employee.schema";
import { contractSchema } from "../../schemas/contract.schema";
import { employeeRoleSchema } from "../../schemas/employeeRole.schema";
import { createEmployee } from "../../services/employeeService";
import { createContract } from "../../services/contractService";
import { createEmployeeRole } from "../../services/employeeRoleService";
import {
  useCreateEmployee,
  type ContractInput,
  type EmployeeInput,
  type RoleInput,
} from "../../context/CreateEmployeeContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const steps = ["employee", "contract", "role", "review"] as const;
type Step = (typeof steps)[number];

const CreateEmployeeFlow = () => {
  const [step, setStep] = useState<Step>("employee");
  const {
    employee,
    setEmployee,
    contract,
    setContract,
    employeeRole,
    setEmployeeRole,
    reset,
  } = useCreateEmployee();

  const navigate = useNavigate();

  const goToNext = () => setStep((prev) => steps[steps.indexOf(prev) + 1]);
  const goToPrevious = () => setStep((prev) => steps[steps.indexOf(prev) - 1]);

  const handleEmployeeSubmit = (data: z.infer<typeof employeeSchema>) => {
    setEmployee(data);
    goToNext();
  };

  const handleContractSubmit = (data: z.input<typeof contractSchema>) => {
    setContract(data);
    goToNext();
  };

  const handleEmployeeRoleSubmit = (data: z.infer<typeof employeeRoleSchema>) => {
    setEmployeeRole(data);
    goToNext();
  };

  const handleFinalSubmit = async () => {
    const employeeInput = employee as EmployeeInput;
    const contractInput = { ...contract } as ContractInput;
    const roleInput = employeeRole as RoleInput;

    try {
      const createdEmployee = await createEmployee(employeeInput);
      if (!createdEmployee?.id) {
        return;
      }

      const createdContract = await createContract({
        ...contractInput,
        employeeId: createdEmployee.id,
      });
      if (!createdContract?.id) {
        return;
      }

      const createdEmployeeRole = await createEmployeeRole({
        ...roleInput,
        contractId: createdContract.id,
      });
      if (!createdEmployeeRole?.id) {
        return;
      }

      reset();
      navigate("/employees");
    } catch {
      toast.error("Submission Failed");
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/employees");
  };

  const renderStep = () => {
    switch (step) {
      case "employee":
        return (
          <EmployeeForm onFormSubmit={handleEmployeeSubmit} defaultValues={employee} />
        );
      case "contract":
        return (
          <ContractForm onFormSubmit={handleContractSubmit} defaultValues={contract} />
        );
      case "role":
        return (
          <EmployeeRoleForm
            onFormSubmit={handleEmployeeRoleSubmit}
            defaultValues={employeeRole}
          />
        );
      case "review":
        return (
          <ReviewForm
            employee={employee as EmployeeInput}
            contract={contract as ContractInput}
            employeeRole={employeeRole as RoleInput}
            onFinalSubmit={handleFinalSubmit}
          />
        );
    }
  };

  return (
    <div>
      {renderStep()}
      {step !== "employee" && (
        <Button variant="contract" onClick={goToPrevious}>
          Back
        </Button>
      )}
      <Button variant="delete" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default CreateEmployeeFlow;
