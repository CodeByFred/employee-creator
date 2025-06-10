import axios from "axios";
import type { Employee } from "../types/types";

const API_URL = "http://localhost:8080/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(API_URL);
  return response.data;
};

// create employee

// update employee

// delete employee
export const deleteEmployee = async (id: number) => {
  console.log("Attempting to delete employee");
  const response = await axios.delete(API_URL + `/${id}`);
  console.log(`Employee with id ${id} deleted`, response);
};
