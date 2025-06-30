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
    // cast your partials back to full inputs
    const employeeInput = employee as EmployeeInput;
    const contractInput = { ...contract } as ContractInput;
    const roleInput = employeeRole as RoleInput;

    try {
      // 1) Create employee
      const createdEmployee = await createEmployee(employeeInput);
      if (!createdEmployee?.id) {
        console.error("Failed to create employee");
        return; // stop here
      }

      // 2) Create contract, injecting employeeId
      const createdContract = await createContract(contractInput);
      if (!createdContract?.id) {
        console.error("Failed to create contract");
        return; // stop here
      }

      // 3) Create employeeRole, injecting both IDs
      const createdEmployeeRole = await createEmployeeRole({
        ...roleInput,
        employeeId: createdEmployee.id,
        contractId: createdContract.id,
      });
      if (!createdEmployeeRole?.id) {
        console.error("Failed to create employee role");
        return; // stop here
      }

      // 4) All done—clear context and go home
      reset();
      navigate("/employees");
    } catch (err) {
      console.error("Submission failed", err);
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
    <>
      {renderStep()}
      {step !== "employee" && (
        <Button variant="delete" onClick={goToPrevious}>
          Back
        </Button>
      )}
      <Button variant="update" onClick={handleCancel}>
        Cancel
      </Button>
    </>
  );
};

export default CreateEmployeeFlow;
