import { toast } from "react-toastify";
import type { DepartmentWithRoles } from "../types/types";
import api from "./axiosSetup";
import { DEPARTMENTS_URL } from "./urls";

export const getAllDepartmentsWithRoles = async (): Promise<
  DepartmentWithRoles[] | undefined
> => {
  try {
    const response = await api.get<DepartmentWithRoles[]>(DEPARTMENTS_URL);
    return response.data;
  } catch {
    toast.error("Failed to fetch departments and roles");
    return undefined;
  }
};
