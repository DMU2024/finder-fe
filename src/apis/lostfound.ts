import { Instance } from "../utils/axios";
import { formatDate } from "../utils/format";

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
  lat: number;
  lng: number;
}

interface LostFoundQuery {
  keyword?: string | undefined;
  color?: string | undefined;
  category?: string | undefined;
  startYmd?: Date | undefined;
  endYmd?: Date | undefined;
}

const getLostFoundDetail = async (id: string) => {
  const { data } = await Instance.get<LostFoundDetail>(`/api/lostfound/${id}`);

  return data;
};

const searchLostFound = async (query: LostFoundQuery | undefined, page: number) => {
  const startYmdFmt = formatDate(query?.startYmd);
  const endYmdFmt = formatDate(query?.endYmd);

  const { data } = await Instance.get<LostFound[]>("/api/lostfound/search", {
    params: {
      ...query,
      startYmd: startYmdFmt ? startYmdFmt : undefined,
      endYmd: endYmdFmt ? endYmdFmt : undefined,
      page: page
    }
  });

  return data;
};

const placeLostFound = async (query: string, page: number) => {
  const { data } = await Instance.get<LostFound[]>("/api/lostfound/place", {
    params: {
      keyword: query,
      page: page
    }
  });

  return data;
};

export type { LostFoundQuery, LostFound, LostFoundDetail };
export { getLostFoundDetail, searchLostFound, placeLostFound };
