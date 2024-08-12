import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL ?? "http://localhost:8081";

const Instance = axios.create({
  baseURL: BASE_URL
});

export { BASE_URL, Instance };
