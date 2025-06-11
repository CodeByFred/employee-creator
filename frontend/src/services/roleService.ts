import axios from "axios";
import type { RoleOption } from "../types/types";
import { ROLES_URL } from "./urls";

export const getAllRoles = async (): Promise<RoleOption[]> => {
  const response = await axios.get<RoleOption[]>(ROLES_URL);
  return response.data;
};
