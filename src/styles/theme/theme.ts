export const styledTheme = {
  colors: {
    primary: '#000080',
    secondary: '#E6F7FF',
    body: '#f4f4f4',
    placeholder: '#8c8c8c',

    light: '#F7F7F7',
    white: '#FFFFFF',
    black: '#000000',
    blackShadow: '#EDEDEE',
    magenta: '#EB2F96',
    gray: '#1A191C',
    bgColor: 'rgb(230,230,240)',
    inkBlue: '#040C2B',
    lightBlue: '#253174',
    shadowBlue: '#D6E5FE',
    skyBlue: '#F2F3FC',
    purple: '#C6C8F0',
    lightPurple: '#38426F',
    lightGray: '#D9D9D9',
    lightSkyBlue: '#D6D7FE',
    placeholderColor: '#CECFD1',
    green: '#00A86B',
    paginationBorder: '#ECECED',
    paginationIcon: '#7A869A',
    disabledColor: '#CECFD1',
    danger: '#F04924',
    lightOrange: '#F8E5E1',
    yellow: '#FEBE00',
    lightYellow: '#FDEED1',
    success: '#52C41A',
    info: '#0A82F9',
    warning: '#FFB100',

    controlOutline: '#DFE1E6',
    colorBorder: '#DFE1E6'
  },
  device: {
    xxl: '1440px',
    xl: '1199px',
    lg: '1024px',
    md: '991px',
    sm: '767px',
    xs: '575px'
  },
  font: {
    inter: 'Inter'
  },
  size: {
    headerHeight: '50px'
  }
} as const;

export type ThemeType = typeof styledTheme;
