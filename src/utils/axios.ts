import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL ?? "http://localhost:8081";
const KAKAO_AUTH = "https://kauth.kakao.com";
const KAKAO_CLIENTID = process.env.REACT_APP_KAKAO_REST;
const KAKAO_CALLBACK =
  process.env.REACT_APP_KAKAO_CALLBACK ?? "http://localhost:3000/login";

const Instance = axios.create({
  baseURL: BASE_URL
});

export { BASE_URL, KAKAO_AUTH, KAKAO_CLIENTID, KAKAO_CALLBACK, Instance };
