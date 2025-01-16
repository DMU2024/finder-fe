import { Instance } from "@/utils/axios";

interface BookMark {
  id: number;
  location: string;
  address: string;
  lat: number;
  lng: number;
}

const getBookMark = async (userId: number) => {
  const { data } = await Instance.get<BookMark[]>(`/api/bookmarks/${userId}`);

  return data;
};

const postBookMark = async (userId: number, location: string) => {
  const { data } = await Instance.post<BookMark>("/api/bookmarks", {
    userId: userId,
    location: location
  });

  return data;
};

const deleteBookMark = async (bookmarkId: number) => {
  const { data } = await Instance.delete<number>(`/api/bookmarks/${bookmarkId}`);

  return data;
};

export type { BookMark };
export { deleteBookMark, getBookMark, postBookMark };
