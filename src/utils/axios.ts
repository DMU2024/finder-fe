import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "http://localhost:8888";

const Instance = axios.create({
  baseURL: BASE_URL
});

export { BASE_URL, Instance };
