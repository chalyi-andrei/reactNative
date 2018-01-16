// @flow
import { StyleSheet } from 'react-native';

import stylesConst from '../../constants/styles';

export default StyleSheet.create({
  header: {
    paddingTop: stylesConst.size.statusbarHeight,
    minHeight: stylesConst.size.statusbarHeight + stylesConst.size.appbarHeight,
    backgroundColor: stylesConst.colors.lightBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBtn: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    width: '28%',
  },
  headerBtnRight: {
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: stylesConst.font.large,
    color: stylesConst.colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avatar: {
    borderRadius: 15,
    width: 30,
    height: 30,
  }
});
