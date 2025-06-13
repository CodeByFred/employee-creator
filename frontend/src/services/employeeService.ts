import api from "./axiosSetup";
import type { Employee } from "../types/types";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import { EMPLOYEES_URL } from "./urls";
import { toast } from "react-toastify";

export const getAllEmployees = async (): Promise<Employee[] | undefined> => {
  try {
    const response = await api.get<Employee[]>(EMPLOYEES_URL);
    return response.data;
  } catch {
    toast.error("Failed to fetch employees");
    return undefined;
  }
};

export const getEmployeeById = async (id: number): Promise<Employee | undefined> => {
  try {
    const response = await api.get<Employee>(EMPLOYEES_URL + `/${id}`);
    return response.data;
  } catch {
    toast.error("Failed to fetch employee by ID");
    return undefined;
  }
};

export const toggleIsActive = async (id: number): Promise<void> => {
  try {
    await api.put(EMPLOYEES_URL + `/${id}/toggleIsActive`);
    toast.success("Employee status updated");
  } catch {
    toast.error("Failed to set active status of employee");
  }
};

export const deleteEmployee = async (id: number): Promise<boolean> => {
  try {
    await api.delete(EMPLOYEES_URL + `/${id}`);
    toast.success("Employee deleted successfully");
    return true;
  } catch {
    toast.error("Failed to delete employee");
    return false;
  }
};

export const createEmployee = async (
  data: EmployeeForm
): Promise<Employee | undefined> => {
  try {
    const response = await api.post<Employee>(EMPLOYEES_URL, data);
    toast.success("Employee created successfully");
    return response.data;
  } catch {
    toast.error("Failed to create employee");
    return undefined;
  }
};

export const updateEmployee = async (data: EmployeeForm, id: number): Promise<void> => {
  try {
    await api.patch(EMPLOYEES_URL + `/${id}`, data);
    toast.success("Employee updated successfully");
  } catch {
    toast.error("Failed to update employee");
  }
};
