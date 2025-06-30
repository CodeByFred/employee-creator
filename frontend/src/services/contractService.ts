import { toast } from "react-toastify";
import api, { type APIErrorResponse } from "./axiosSetup";
import { CONTRACTS_URL } from "./urls";
import type ContractForm from "../components/ContractForm/ContractForm";
import type { Contract } from "../types/types";

export const createContract = async (data: ContractForm) => {
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
