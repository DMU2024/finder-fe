import { Instance } from "../utils/axios";

interface User {
  userId: number;
  email: string;
  password: string;
  username: string;
}

const getUser = async (userId: number) => {
  const { data } = await Instance.get<User>(`api/users/${userId}`);

  return data;
};

const getUsers = async () => {
  const { data } = await Instance.get<User[]>("api/users");

  return data;
};

const postSignUpUser = async (
  email: string,
  password: string,
  username: string
) => {
  const { data } = await Instance.post<User>("api/users/signup", {
    email: email,
    password: password,
    username: username
  });

  return data;
};

const postLoginUser = async (email: string, password: string) => {
  const { data } = await Instance.post<User>("api/users/login", {
    email: email,
    password: password
  });

  return data;
};

export type { User };
export { getUser, getUsers, postSignUpUser, postLoginUser };
