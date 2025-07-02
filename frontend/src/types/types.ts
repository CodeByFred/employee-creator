export type DepartmentWithRoles = {
  department: string;
  departmentId: number;
  roles: {
    roleId: number;
    roleType: string;
  }[];
};

export type Employee = {
  id: number;
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
};

export type EmployeeSummary = {
  id: number;
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  department: string;
  isActive: boolean;
};

export type EmployeeResponse = {
  id: number;
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
};

export type EmployeeRoles = {
  employeeId: number;
  roleId: number;
  contractId: number;
  priorYearsOfExperience: number;
  promotionType: "NONE" | "PROMOTION" | "LATERAL" | "DEMOTION";
  performanceRating: number;
};

export type EmployeeRolesResponse = {
  id: number;
  role: Role;
  contract: Contract;
  priorYearsOfExperience: number;
  promotionType: "NONE" | "PROMOTION" | "LATERAL" | "DEMOTION";
  performanceRating: number;
};

export type Department = {
  departmentId: number;
  department: string;
};

export type Role = {
  roleId: number;
  roleType: string;
  department: Department;
};

export type Contract = {
  id: number;
  employee_id: number;
  contractType: "CONTRACT" | "PERMANENT";
  startDate: string;
  finishDate?: string;
  contractEmploymentType: "FULL_TIME" | "PART_TIME";
  hoursPerWeek: number;
  hasActiveContract: boolean;
};

export type ContractsForEmployeeResponse = {
  id: number;
  employeeRoles: EmployeeRolesResponse[];
  contractType: "CONTRACT" | "PERMANENT";
  startDate: string;
  finishDate?: string;
  contractEmploymentType: "FULL_TIME" | "PART_TIME";
  hoursPerWeek: number;
  createdAt: string;
  updatedAt: string;
  hasActiveContract: boolean;
};
