// @flow
import { PixelRatio, Platform } from 'react-native';

export function normalize(size: number): number {
  if (PixelRatio.get() <= 2) {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }

  return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
}

const styles = {
  colors: {
    white: '#fff',
    black: '#000',
    semiBlack: '#000b',
    gray: '#ccc',
    red: '#fd5252',
    lightBlue: '#0096ff',
    blue: '#307fff',
    lightGray: '#F9F9F9',
    borderColor: '#DFDFDF',
    darkGray: '#373738',
  },
  font: {
    small: normalize(14),
    normal: normalize(16),
    large: normalize(20),
    xLarge: normalize(24),
  },
  size: {
    borderRadius: 3,
    statusbarHeight: Platform.OS === 'ios' ? 20 : 0,
    appbarHeight: Platform.OS === 'ios' ? 44 : 56,
    paddingHorizontal: 10,
  },
};

styles.iosBlackShadow = {
  shadowColor: styles.colors.darkGray,
  shadowOpacity: 0.15,
  shadowRadius: 2,
};

export default styles;
