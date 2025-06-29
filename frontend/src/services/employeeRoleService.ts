import { toast } from "react-toastify";
import type { EmployeeRoleResponse } from "../types/types";
import api from "./axiosSetup";
import { EMPLOYEE_ROLES_URL } from "./urls";

export const getAllEmployeeRoles = async (): Promise<
  EmployeeRoleResponse[] | undefined
> => {
  try {
    const response = await api.get<EmployeeRoleResponse[]>(EMPLOYEE_ROLES_URL);
    return response.data;
  } catch {
    toast.error("Failed to fetch employees");
    return undefined;
  }
};

export const getEmployeeRoleByEmployeeId = async (
  id: number
): Promise<EmployeeRoleResponse[] | undefined> => {
  try {
    const response = await api.get<EmployeeRoleResponse[]>(
      EMPLOYEE_ROLES_URL + `/employee` + `/${id}`
    );
    return response.data;
  } catch {
    toast.error("Failed to fetch employee role for employee");
    return undefined;
  }
};
