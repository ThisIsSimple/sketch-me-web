import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_AI_SERVER_URL,
});
