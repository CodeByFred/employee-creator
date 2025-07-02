import { toast } from "react-toastify";
import api, { type APIErrorResponse } from "./axiosSetup";
import { CONTRACTS_URL } from "./urls";
import type ContractForm from "../components/ContractForm/ContractForm";
import type { Contract, ContractsForEmployeeResponse } from "../types/types";

export const createContract = async (data: ContractForm & { employeeId: number }) => {
  const response = await api.post<APIErrorResponse>(CONTRACTS_URL, data, {
    validateStatus: () => true,
  });

  if (response.status === 201) {
    toast.success("Contract created successfully");
    return response.data as Contract;
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

export const getEmployeeContractsByEmployeeId = async (
  id: number
): Promise<ContractsForEmployeeResponse[] | undefined> => {
  try {
    const response = await api.get<ContractsForEmployeeResponse[]>(
      CONTRACTS_URL + `/employee` + `/${id}`
    );
    return response.data;
  } catch {
    toast.error("Failed to fetch employee contract data");
    return undefined;
  }
};
