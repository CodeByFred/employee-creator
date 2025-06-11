import axios from "axios";
import type { Employee } from "../types/types";

const API_URL = "http://localhost:8080/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(API_URL);
  return response.data;
};

export const toggleIsActive = async (id: number) => {
  console.log("Attempting to toggle employee is active status");
  const response = await axios.put(API_URL + `/${id}/toggleIsActive`);
  console.log(`Employee with id ${id} result is:`, response);
};

export const deleteEmployee = async (id: number) => {
  console.log("Attempting to delete employee");
  const response = await axios.delete(API_URL + `/${id}`);
  console.log(`Employee with id ${id} deleted result is:`, response);
};
