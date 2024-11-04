import { Marker } from "./marker";
import { Instance, KAKAO_AUTH, KAKAO_CALLBACK, KAKAO_CLIENTID } from "../utils/axios";

interface User {
  userId: number;
  username: string;
  profileImage: string;
  thumbnailImage: string;
}

interface KakaoScopeInfo {
  id: number;
  scopes: KakaoScope[];
}

interface KakaoScope {
  id: string;
  display_name: string;
  type: string;
  using: boolean;
  agreed: boolean;
  revocable: boolean;
}

const getUser = async (userId: number) => {
  const { data } = await Instance.get<User>(`/api/users/${userId}`);

  return data;
};

const getUserLostGoods = async (userId: number) => {
  const { data } = await Instance.get<Marker[]>(`/api/users/${userId}/lostgoods`);

  return data;
};

const getKakaoScopes = async (userId: number) => {
  const { data } = await Instance.get<KakaoScopeInfo>(`/api/users/scopes/${userId}`);

  return data;
};

const postRevokeKakaoScopes = async (userId: number, scopes: string[]) => {
  const { data } = await Instance.post<KakaoScopeInfo>(`/api/users/scopes/${userId}`, {
    scopes: scopes.join(",")
  });

  return data;
};

const getLoginURI = () => {
  return (
    `${KAKAO_AUTH}/oauth/authorize?` +
    `client_id=${KAKAO_CLIENTID}` +
    `&redirect_uri=${KAKAO_CALLBACK}` +
    `&response_type=code`
  );
};

const postLogin = async (code: string) => {
  const { data } = await Instance.post<User>("/api/auth/login", {
    code: code,
    isDev: !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  });

  return data;
};

const postLogout = async (userId: number) => {
  const { data } = await Instance.post<User>("/api/auth/logout", {
    userId: userId
  });

  return data;
};

const postUnlink = async (userId: number) => {
  const { data } = await Instance.post<User>("/api/auth/unlink", {
    userId: userId
  });

  return data;
};

export type { User, KakaoScopeInfo, KakaoScope };
export {
  getUser,
  getUserLostGoods,
  getKakaoScopes,
  postRevokeKakaoScopes,
  getLoginURI,
  postLogin,
  postLogout,
  postUnlink
};
