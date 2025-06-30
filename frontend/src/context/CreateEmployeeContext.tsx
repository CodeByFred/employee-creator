import { createContext, useState, useContext } from "react";
import { z } from "zod/v4";
import { employeeSchema } from "../schemas/employee.schema";
import { contractSchema } from "../schemas/contract.schema";
import { employeeRoleSchema } from "../schemas/employeeRole.schema";

export type EmployeeInput = z.infer<typeof employeeSchema>;
export type ContractInput = z.input<typeof contractSchema>;
export type RoleInput = z.infer<typeof employeeRoleSchema>;

export type CreateEmployeeContextType = {
  employee: Partial<EmployeeInput>;
  setEmployee: (data: Partial<EmployeeInput>) => void;
  contract: Partial<ContractInput>;
  setContract: (data: Partial<ContractInput>) => void;
  employeeRole: Partial<RoleInput>;
  setEmployeeRole: (data: Partial<RoleInput>) => void;
  reset: () => void;
};

const CreateEmployeeContext = createContext<CreateEmployeeContextType>({
  employee: {},
  setEmployee: () => {},
  contract: {},
  setContract: () => {},
  employeeRole: {},
  setEmployeeRole: () => {},
  reset: () => {},
});

export const useCreateEmployee = (): CreateEmployeeContextType => {
  return useContext(CreateEmployeeContext);
};

export const CreateEmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employee, setEmployeeState] = useState<Partial<EmployeeInput>>({});
  const [contract, setContractState] = useState<Partial<ContractInput>>({});
  const [employeeRole, setEmployeeRoleState] = useState<Partial<RoleInput>>({});

  const setEmployee = (data: Partial<EmployeeInput>) =>
    setEmployeeState((prev) => ({ ...prev, ...data }));
  const setContract = (data: Partial<ContractInput>) =>
    setContractState((prev) => ({ ...prev, ...data }));
  const setEmployeeRole = (data: Partial<RoleInput>) =>
    setEmployeeRoleState((prev) => ({ ...prev, ...data }));

  const reset = () => {
    setEmployeeState({});
    setContractState({});
    setEmployeeRoleState({});
  };

  return (
    <CreateEmployeeContext.Provider
      value={{
        employee,
        setEmployee,
        contract,
        setContract,
        employeeRole,
        setEmployeeRole,
        reset,
      }}
    >
      {children}
    </CreateEmployeeContext.Provider>
  );
};
