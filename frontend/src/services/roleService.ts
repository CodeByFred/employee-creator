import type { Role } from "../types/types";
import { ROLES_URL } from "./urls";
import api from "./axiosSetup";
import { toast } from "react-toastify";

export const getAllRoles = async (): Promise<Role[]> => {
  try {
    const response = await api.get<Role[]>(ROLES_URL);
    return response.data;
  } catch {
    toast.error("Failed to fetch roles");
    return [];
  }
};
