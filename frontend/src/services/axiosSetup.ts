import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status) {
      switch (status) {
        case 400:
          toast.error("Validation error");
          break;
        case 404:
          toast.error("Not found");
          break;
        case 500:
          toast.error("Internal server error");
          break;
        default:
          toast.error("Unexpected error");
      }
    } else {
      toast.error("No response from server");
    }

    return Promise.reject(error);
  }
);

export default api;
