import { ColorList } from "./color";

const calRem = (size: number): string => `${size / 16}rem`;

const color = {
  main_green: ColorList.romaine400,
  main_black: ColorList.black900,
  main_gray: ColorList.black250,
  light_green: ColorList.v2romaine250,
  dark_green: ColorList.v2romaine700,
  medium_green: ColorList.v2romaine400,
};
const size = {
  mobileMin: 320,
  mobile: 425,
  tablet: 768,
  desktopMin: 946,
};

const fontSize = {
  12: calRem(12),
  14: calRem(14),
  18: calRem(18),
  20: calRem(20),
  30: calRem(30),
  40: calRem(40),

  //모바일 폰트
  11: calRem(11),
  16: calRem(16),
  22: calRem(22),
  28: calRem(28),
};

const fontWeight = {
  extraBold: 800,
  semiBold: 600,
  regular: 400,
};

const theme = {
  fontSize,
  fontWeight,
  color,
  size,
  calRem,
};

export default theme;
