export type DepartmentWithRoles = {
  department: string;
  departmentId: number;
  roles: {
    roleId: number;
    roleType: string;
  }[];
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
  contractType: "CONTRACT" | "PERMANENT";
  startDate: string;
  finishDate?: string;
  contractEmploymentType: "FULL_TIME" | "PART_TIME";
  hoursPerWeek: number;
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
  // employeeRoles: EmployeeRolesResponse[];
};

export type EmployeeRoles = {
  employeeId: number;
  roleId: number;
  contractId: number;
  // 0 is default
  priorYearsOfExperience: number;
  // NONE is default
  promotionType: "NONE" | "PROMOTION" | "LATERAL" | "DEMOTION";
  // 1 to 5
  performanceRating: number;
};

export type EmployeeRolesResponse = {
  id: number;
  employee: Employee;
  role: Role;
  contract: Contract;
  priorYearsOfExperience: number;
  promotionType: "NONE" | "PROMOTION" | "LATERAL" | "DEMOTION";
  performanceRating: number;
};
