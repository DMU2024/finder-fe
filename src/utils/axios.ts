import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL ?? "http://localhost:4000";

const Instance = axios.create({
  baseURL: BASE_URL
});

const KakaoInstance = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local",
  headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST}` }
});

export { Instance, KakaoInstance };
