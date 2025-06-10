export type Department = {
  department: string;
};

export type Role = {
  roleType: string;
  department: Department;
};

export type Contract = {
  id: number;
  contractType: string;
  startDate: Date;
  finishDate: Date;
  contractEmploymentType: string;
  hoursPerWeek: number;
  employee: Employee;
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
