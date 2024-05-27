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

interface LostGoodsDetail {
  atcId: string;
  clrNm: string;
  lstFilePathImg: string;
  lstHor: string;
  lstLctNm: string;
  lstPlace: string;
  lstPlaceSeNm: string;
  lstPrdtNm: string;
  lstSbjt: string;
  lstSteNm: string;
  lstYmd: string;
  orgId: string;
  orgNm: string;
  prdtClNm: string;
  tel: string;
  uniq: string;
}

const getLostGoods = async (prevId?: string) => {
  const { data } = await Instance.get<LostGoods[]>("/lostgoods", {
    params: { prevId: prevId }
  });

  return data;
};

const getLostGoodsDetail = async (actId: string) => {
  const { data } = await Instance.get<LostGoodsDetail>(`/lostgoods/${actId}`);

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

export type { LostGoods, LostGoodsDetail };
export { getLostGoods, getLostGoodsDetail, searchLostGoods };
