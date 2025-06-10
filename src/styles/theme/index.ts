import type { ThemeConfig } from 'antd';
import { theme as antdTheme } from 'antd';

import { hexToRGBA } from '@/shared/utils/functions';

import { styledTheme } from './theme';

export interface GlobalTheme {
  antd: ThemeConfig;
  styled: typeof styledTheme;
}

const colors = styledTheme.colors;

export const theme: GlobalTheme = {
  antd: {
    algorithm: antdTheme.defaultAlgorithm,
    hashed: false,
    token: {
      colorText: colors.primary,
      colorBgLayout: colors.body,
      colorBgContainer: colors.white,
      colorError: colors.danger,
      colorWarning: colors.warning,
      colorInfo: colors.info,
      colorSuccess: colors.success,
      colorPrimary: colors.primary,
      controlOutline: colors.controlOutline,
      colorBorder: colors.colorBorder,
      colorTextPlaceholder: colors.placeholder,
      colorTextDisabled: colors.primary,

      colorBgContainerDisabled: hexToRGBA(colors.primary, 0.1),
      controlItemBgActive: hexToRGBA(colors.primary, 0.1),
      controlItemBgHover: hexToRGBA(colors.primary, 0.1),

      controlPaddingHorizontal: 20 + 1,
      controlPaddingHorizontalSM: 16 + 1,
      paddingXXS: 6,
      paddingSM: 20,

      borderRadius: 100,
      borderRadiusLG: 12,
      borderRadiusSM: 6,
      borderRadiusOuter: 6,
      borderRadiusXS: 6,

      controlHeight: 40,
      controlHeightLG: 55,
      controlHeightSM: 30,

      fontSize: 14,
      fontSizeLG: 16,
      fontSizeXL: 18,
      fontSizeSM: 12,
      fontSizeIcon: 14,
      fontFamily: styledTheme.font.inter
    },
    components: {
      Form: {
        itemMarginBottom: 0,
        labelColor: colors.primary,
        labelHeight: 20,
        verticalLabelPadding: '0 0 4px'
      },
      Layout: {
        headerHeight: 50,
        headerBg: colors.white,
        triggerBg: colors.primary,
        triggerHeight: 50,
        siderBg: colors.primary,
        fontSizeIcon: 14,
        headerPadding: '10px 20px'
      },
      Menu: {
        fontSize: 14,
        iconSize: 14,
        collapsedIconSize: 14,
        borderRadiusLG: 0,
        itemMarginInline: 0,
        itemMarginBlock: 4,
        itemHeight: 50,
        itemPaddingInline: '0',
        controlPaddingHorizontal: 0,
        itemBg: colors.primary,
        // subMenuItemSelectedColor: colors.white,
        darkItemBg: colors.primary,
        darkItemColor: '#FFFFFF9C',
        darkItemHoverBg: '#FFFFFF1A',
        darkItemSelectedBg: '#FFFFFF1A',
        darkItemHoverColor: colors.white,
        darkItemSelectedColor: colors.white,
        darkSubMenuItemBg: colors.primary
      },
      Button: {
        borderRadius: 100,
        borderRadiusLG: 100,
        borderRadiusSM: 6,
        colorTextDisabled: colors.white,
        colorBorder: 'transparent'
      },
      Pagination: {
        borderRadius: 6
      },
      Select: {
        borderRadius: 12
      },
      Tabs: {
        horizontalItemPadding: '12px 0'
      },
      Table: {
        headerBorderRadius: 0,
        headerBg: colors.light,
        rowHoverBg: hexToRGBA(colors.primary, 0.1),
        cellPaddingBlockSM: 8,
        cellPaddingBlockMD: 12,
        cellPaddingInlineSM: 14,
        cellPaddingInlineMD: 16,
        margin: 10
      },
      Modal: {
        borderRadiusLG: 20,
        paddingMD: 30,
        paddingContentHorizontalLG: 45
      },
      Typography: {
        algorithm: true,
        fontSizeHeading1: 36,
        fontSizeHeading2: 32,
        titleMarginBottom: 0,
        titleMarginTop: 0,
        colorText: colors.black
      }
    }
  },
  styled: styledTheme
};
