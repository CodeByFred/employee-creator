import axios from "axios";
import type ContractForm from "../components/ContractForm/ContractForm";
import { CONTRACTS_URL } from "./urls";

export const createContract = async (data: ContractForm & { employeeId: number }) => {
  const response = await axios.post(CONTRACTS_URL, data);
  return response.data;
};
