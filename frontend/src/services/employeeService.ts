import api, { type APIErrorResponse } from "./axiosSetup";
import type { Employee, EmployeeSummary } from "../types/types";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import { EMPLOYEES_URL } from "./urls";
import { toast } from "react-toastify";

export const getAllEmployees = async (): Promise<EmployeeSummary[] | undefined> => {
  try {
    const response = await api.get<EmployeeSummary[]>(EMPLOYEES_URL);
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
  console.log("Submitting employee:", data);

  const response = await api.post<APIErrorResponse>(EMPLOYEES_URL, data, {
    validateStatus: () => true,
  });

  if (response.status === 201) {
    toast.success("Employee created successfully");
    return response.data as Employee;
  }

  const errors = response.data?.errors;
  if (errors && Object.keys(errors).length > 0) {
    Object.values(errors).forEach((messages) => {
      messages.forEach((msg) => toast.error(msg));
    });
  } else {
    toast.error("Request failed");
  }

  return undefined;
};

export const updateEmployee = async (data: EmployeeForm, id: number): Promise<void> => {
  const response = await api.patch<APIErrorResponse>(`${EMPLOYEES_URL}/${id}`, data, {
    validateStatus: () => true,
  });

  if (response.status === 200) {
    toast.success("Employee updated successfully");
    return;
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
