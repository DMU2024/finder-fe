import { CalendarStrings, defaultDatePickerStrings } from "@fluentui/react-datepicker-compat";

const colorOption = {
  "레드(빨강)": "#f00",
  "엘로우(노랑)": "#ff0",
  "그린(초록)": "#0f0",
  "터키오이스(옥)": "#0ff",
  "블루(파랑)": "#00f",
  "마젠타(자홍)": "#f0f",
  "화이트(흰)": "#fff",
  "그레이(회)": "#ebebeb",
  "라이트그레이(옅은회)": "#d7d7d7",
  "실버(은)": "#c2c2c2",
  "그레이(암회)": "#acacac",
  "알리자린(홍)": "#ee1d24",
  "시안(청록)": "#00aeef",
  "핑크(분홍)": "#ed008c",
  "블랙(검정)": "#000",
  "코럴(산호)": "#f7977a",
  "피치오렌지(오렌지)": "#fdc68c",
  "엘로우(밝은노랑)": "#fff799",
  "라임(라임)": "#c6df9c",
  "네온그린(형광초록)": "#a4d49d",
  "씨그린(노르스름한녹)": "#81ca9d",
  "딥스카이블루(새파란하늘)": "#6ccff7",
  "코발트(짙은청록)": "#7ca6d8",
  "로열블루(밝은남)": "#8293ca",
  "바이올렛(보라)": "#a286bd",
  "퓨시아(자홍)": "#bc8cbf",
  "핑크(연한핑크)": "#f49bc1",
  "레드(연한레드)": "#f5999d",
  "오렌지(연한오렌지)": "#fbaf5a",
  "샤르트뢰즈(역녹)": "#acd372",
  "스트롱시안(진한청록)": "#16bcb4",
  "코발트(밝은남)": "#438ccb",
  "블루(어두운파랑)": "#5e5ca7",
  "레드(연한빨강)": "#f16d7e",
  "오렌지(선명한오렌지)": "#f7941d",
  "에메랄드(선녹)": "#37b44a",
  "다크시안(어두운청록)": "#00a99e",
  "핑크(선명한분홍)": "#ee105a",
  "다크레드(진빨강)": "#9d0a0f",
  "다크오렌지(어두운오렌지)": "#a36209",
  "올리브(녹갈)": "#aba000",
  "라임그린(어두운청록)": "#007236",
  "다크블루(어두운파랑)": "#0076a4",
  "블루바이올렛(남보라)": "#1d1363",
  "다크바이올렛(진보라)": "#450e61",
  "다크핑크(진분홍)": "#9e005c",
  "브라운(갈)": "#7b3000",
  "오렌지(주황)": "#ff8000",
  기타: "#fff"
};

const categoryOption = {
  가방: ["여성용가방", "남성용가방", "기타가방"],
  귀금속: ["반지", "목걸이", "귀걸이", "시계", "기타"],
  도서용품: ["학습서적", "소설", "컴퓨터서적", "만화책", "기타서적"],
  서류: ["서류", "기타물품"],
  산업용품: ["기타물품"],
  쇼핑백: ["쇼핑백"],
  스포츠용품: ["스포츠용품"],
  악기: ["건반악기", "관악기", "타악기", "현악기", "기타악기"],
  유가증권: ["어음", "상품권", "채권", "기타"],
  의류: ["여성의류", "남성의류", "아기의류", "모자", "신발", "기타의류"],
  자동차: ["자동차", "열쇠", "네비게이션", "자동차번호판", "임시번호판", "기타용품"],
  전자기기: ["태블릿", "스마트워치", "무선이어폰", "카메라", "기타용품"],
  지갑: ["여성용 지갑", "남성용 지갑", "기타 지갑"],
  증명서: ["신분증", "면허증", "여권", "기타"],
  컴퓨터: ["삼성노트북", "LG노트북", "애플노트북", "기타"],
  카드: ["신용(체크)카드", "일반카드", "교통카드", "기타카드"],
  현금: ["현금", "수표", "외화", "기타"],
  휴대폰: ["삼성휴대폰", "LG휴대폰", "아이폰", "기타휴대폰", "기타통신기기"],
  기타물품: ["안경", "선글라스", "매장문화재", "기타"],
  유류품: ["유류품"]
};

const localizedStrings: CalendarStrings = {
  ...defaultDatePickerStrings,
  shortDays: ["일", "월", "화", "수", "목", "금", "토"],
  months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],

  shortMonths: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ],
  goToToday: "오늘 날짜로"
};

export { categoryOption, colorOption, localizedStrings };
