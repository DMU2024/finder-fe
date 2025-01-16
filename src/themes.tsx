import { createDarkTheme, createLightTheme } from "@fluentui/react-components";

import { mainColor } from "./styles/color";

const brandColor = {
  0: mainColor,
  10: mainColor,
  20: mainColor,
  30: mainColor,
  40: mainColor,
  50: mainColor,
  60: mainColor,
  70: mainColor,
  80: mainColor,
  90: mainColor,
  100: mainColor,
  110: mainColor,
  120: mainColor,
  130: mainColor,
  140: mainColor,
  150: mainColor,
  160: "#D9D9D9"
};

const darkTheme = createDarkTheme(brandColor);
const lightTheme = createLightTheme(brandColor);

export { darkTheme, lightTheme };
