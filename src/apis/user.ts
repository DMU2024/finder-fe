import { Marker } from "@/apis/marker";
import { Instance } from "@/utils/axios";

interface User {
  userId: number;
  username: string;
  profileImage: string;
  thumbnailImage: string;
  notifyOnlyBookmarked: boolean;
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

const postUserSetting = async (userId: number, notifyOnlyBookmarked: boolean) => {
  const { data } = await Instance.post<User>(`/api/users/${userId}`, {
    notifyOnlyBookmarked: notifyOnlyBookmarked
  });

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

const getLoginURI = async () => {
  const { data } = await Instance.get<string>("/api/auth/login", {
    params: {
      isDev: import.meta.env.MODE === "development"
    }
  });

  return data;
};

const postLogin = async (code: string) => {
  const { data } = await Instance.post<User>("/api/auth/login", {
    code: code,
    isDev: import.meta.env.MODE === "development"
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

export type { KakaoScope, KakaoScopeInfo, User };
export {
  getKakaoScopes,
  getLoginURI,
  getUser,
  getUserLostGoods,
  postLogin,
  postLogout,
  postRevokeKakaoScopes,
  postUnlink,
  postUserSetting
};
