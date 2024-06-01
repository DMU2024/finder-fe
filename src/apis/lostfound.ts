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

interface LostFoundDetail {
  atcId: string;
  csteSteNm: string;
  depPlace: string;
  fdFilePathImg: string;
  fdHor: string;
  fdPlace: string;
  fdPrdtNm: string;
  fdSn: string;
  fdYmd: string;
  fndKeepOrgnSeNm: string;
  orgId: string;
  orgNm: string;
  prdtClNm: string;
  tel: string;
  uniq: string;
}

const getLostFound = async (prevId?: string) => {
  const { data } = await Instance.get<LostFound[]>("/lostfound", {
    params: { prevId: prevId }
  });

  return data;
};

const getLostFoundDetail = async (actId: string, fdSn: string | null) => {
  const { data } = await Instance.get<LostFoundDetail>(`/lostfound/${actId}`, {
    params: {
      fdSn: fdSn
    }
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

const placeLostFound = async (query: string) => {
  const { data } = await Instance.get<LostFound[]>("/place/lostfound", {
    params: {
      query: query
    }
  });

  return data;
};

export type { LostFound, LostFoundDetail };
export { getLostFound, getLostFoundDetail, searchLostFound, placeLostFound };
