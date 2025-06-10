import axios from "axios";
import type { Employee } from "../types/types";

const API_URL = "http://localhost:8080/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(API_URL);
  return response.data;
};
