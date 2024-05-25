import { Instance } from "../utils/axios";

interface LostFound {
  _id: string;
  atcId: string;
  depPlace: string;
  fdFilePathImg: string;
  fdPrdtNm: string;
  fdSbjt: string;
  fdSn: string;
  fdYmd: string;
  prdtClNm: string;
  rnum: string;
}

const getLostFound = async (prevId?: string) => {
  const { data } = await Instance.get<LostFound[]>("/lostfound", {
    params: { prevId: prevId }
  });

  return data;
};

const searchLostFound = async (query: string, prevId?: string) => {
  const { data } = await Instance.get<LostFound[]>("/search/lostfound", {
    params: {
      query: query,
      prevId: prevId
    }
  });

  return data;
};

export type { LostFound };
export { getLostFound, searchLostFound };
