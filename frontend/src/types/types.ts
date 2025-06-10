export type Department = {
  department: string;
};

export type Role = {
  roleType: string;
  department: Department;
};

export type Employee = {
  id: number;
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  role: Role;
};
