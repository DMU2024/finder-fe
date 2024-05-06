import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL ?? "http://localhost:4000";

const Instance = axios.create({
  baseURL: BASE_URL
});

Instance.interceptors.request.use((config) => {
  console.info("calling api");
  return config;
});

export default Instance;
