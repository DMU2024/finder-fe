import {
  Instance,
  KAKAO_AUTH,
  KAKAO_CALLBACK,
  KAKAO_CLIENTID
} from "../utils/axios";

interface User {
  userId: number;
  username: string;
  profileImage: string;
  thumbnailImage: string;
}

const getUser = async (userId: number) => {
  const { data } = await Instance.get<User>(`api/users/${userId}`);

  return data;
};

const getUsers = async () => {
  const { data } = await Instance.get<User[]>("api/users");

  return data;
};

const getLoginURI = () => {
  return (
    `${KAKAO_AUTH}/oauth/authorize?` +
    `client_id=${KAKAO_CLIENTID}` +
    `&redirect_uri=${KAKAO_CALLBACK}` +
    `&response_type=code` +
    `&prompt=login`
  );
};

const postLogin = async (code: string) => {
  const { data } = await Instance.post<User>("api/auth/login", { code: code });

  return data;
};

const postLogout = async (userId: number) => {
  const { data } = await Instance.post<User>("api/auth/logout", {
    userId: userId
  });

  return data;
};

const postUnlink = async (userId: number) => {
  const { data } = await Instance.post<User>("api/auth/unlink", {
    userId: userId
  });

  return data;
};

export type { User };
export { getUser, getUsers, getLoginURI, postLogin, postLogout, postUnlink };
