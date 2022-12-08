import axios from "axios";
import { API_URL } from "./config/apiUrl";

export const makeRequest = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});
