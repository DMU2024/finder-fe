import { Instance } from "../utils/axios";

interface LostGoods {
  _id: string;
  atcId: string;
  lstPlace: string;
  lstPrdtNm: string;
  lstSbjt: string;
  lstYmd: string;
  prdtClNm: string;
  rnum: string;
}

const getLostGoods = async (prevId?: string) => {
  const { data } = await Instance.get<LostGoods[]>("/lostgoods", {
    params: { prevId: prevId }
  });

  return data;
};

const searchLostGoods = async (query: string, prevId?: string) => {
  const { data } = await Instance.get<LostGoods[]>("/search/lostgoods", {
    params: {
      query: query,
      prevId: prevId
    }
  });

  return data;
};

export type { LostGoods };
export { getLostGoods, searchLostGoods };
