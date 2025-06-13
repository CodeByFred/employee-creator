import { toast } from "react-toastify";
import api from "./axiosSetup";
import { CONTRACTS_URL } from "./urls";
import type ContractForm from "../components/ContractForm/ContractForm";

export const createContract = async (data: ContractForm & { employeeId: number }) => {
  try {
    const response = await api.post(CONTRACTS_URL, data);
    toast.success("Contract created successfully");
    return response.data;
  } catch {
    toast.error("Failed to create contract");
    return undefined;
  }
};
