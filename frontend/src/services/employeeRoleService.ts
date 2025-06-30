import { toast } from "react-toastify";
import type { EmployeeRolesResponse } from "../types/types";
import api, { type APIErrorResponse } from "./axiosSetup";
import { EMPLOYEE_ROLES_URL } from "./urls";
import type EmployeeRoleForm from "../components/EmployeeRoleForm/EmployeeRoleForm";

export const getAllEmployeeRoles = async (): Promise<
  EmployeeRolesResponse[] | undefined
> => {
  try {
    const response = await api.get<EmployeeRolesResponse[]>(EMPLOYEE_ROLES_URL);
    return response.data;
  } catch {
    toast.error("Failed to fetch employees");
    return undefined;
  }
};

export const getEmployeeRoleByEmployeeId = async (
  id: number
): Promise<EmployeeRolesResponse[] | undefined> => {
  try {
    const response = await api.get<EmployeeRolesResponse[]>(
      EMPLOYEE_ROLES_URL + `/employee` + `/${id}`
    );
    return response.data;
  } catch {
    toast.error("Failed to fetch employee role for employee");
    return undefined;
  }
};

export const createEmployeeRole = async (
  data: EmployeeRoleForm & { employeeId: number; contractId: number }
) => {
  const response = await api.post<APIErrorResponse>(EMPLOYEE_ROLES_URL, data, {
    validateStatus: () => true,
  });

  if (response.status === 201) {
    toast.success("Employee role created successfully");
    return response.data as EmployeeRolesResponse;
  }

  const errors = response.data?.errors;
  if (errors && Object.keys(errors).length > 0) {
    Object.values(errors).forEach((messages) => {
      messages.forEach((msg) => toast.error(msg));
    });
  } else {
    toast.error("Request failed");
  }
};
