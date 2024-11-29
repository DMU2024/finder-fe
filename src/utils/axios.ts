import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "http://localhost:8081";
const KAKAO_AUTH = "https://kauth.kakao.com";
const KAKAO_CLIENTID = import.meta.env.VITE_KAKAO_REST;
const KAKAO_CALLBACK =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/login"
    : (import.meta.env.VITE_KAKAO_CALLBACK ?? "http://localhost:3000/login");

const Instance = axios.create({
  baseURL: BASE_URL
});

export { BASE_URL, Instance, KAKAO_AUTH, KAKAO_CALLBACK, KAKAO_CLIENTID };
