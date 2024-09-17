import { Instance } from "../utils/axios";

interface Keyword {
  id: number;
  keyword: string;
}

const getKeywords = async (userId: number) => {
  const { data } = await Instance.get<Keyword[]>(`api/keywords/${userId}`);

  return data;
};

const postKeyword = async (userId: number, keyword: string) => {
  const { data } = await Instance.post<Keyword>("api/keywords", {
    userId: userId,
    keyword: keyword
  });

  return data;
};

const deleteKeyword = async (keywordId: number) => {
  const { data } = await Instance.delete<number>(`api/keywords/${keywordId}`);

  return data;
};

export type { Keyword };
export { getKeywords, postKeyword, deleteKeyword };
