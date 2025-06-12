export type Department = {
  department: string;
};

export type Role = {
  roleType: string;
  department: Department;
};

export type RoleOption = {
  roleId: number;
  roleType: string;
  department: {
    departmentId: number;
    department: string;
  };
};

export type Contract = {
  id: number;
  contractType: "CONTRACT" | "PERMANENT";
  startDate: string;
  finishDate: string;
  contractEmploymentType: "FULL_TIME" | "PART_TIME";
  hoursPerWeek: number;
  employeeId: number;
};

export type Employee = {
  id: number;
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  role: Role;
  contracts: Contract[];
};
