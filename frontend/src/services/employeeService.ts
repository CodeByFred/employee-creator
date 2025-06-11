import axios from "axios";
import type { Employee } from "../types/types";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import { EMPLOYEES_URL } from "./urls";

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(EMPLOYEES_URL);
  return response.data;
};

export const getEmployeeById = async (): Promise<Employee> => {
  const response = await axios.get<Employee>(EMPLOYEES_URL);
  return response.data;
};

export const toggleIsActive = async (id: number) => {
  console.log("Attempting to toggle employee is active status");
  const response = await axios.put(EMPLOYEES_URL + `/${id}/toggleIsActive`);
  console.log(`Employee with id ${id} result is:`, response.data);
};

export const deleteEmployee = async (id: number) => {
  console.log("Attempting to delete employee");
  const response = await axios.delete(EMPLOYEES_URL + `/${id}`);
  console.log(`Employee with id ${id} deleted result is:`, response.data);
};

export const createEmployee = async (data: EmployeeForm): Promise<Employee> => {
  console.log(data);
  const response = await axios.post<Employee>(EMPLOYEES_URL, data);
  return response.data;
};
