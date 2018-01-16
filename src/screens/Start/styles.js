// @flow
import { StyleSheet } from 'react-native';
import styles from '../../constants/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: styles.colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  input: {
    width: '100%',
    minWidth: 250,
    height: 40,
    borderWidth: 1,
    borderColor: '#777',
    fontSize: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  row: {
    position: 'relative',
    marginVertical: 13,
  },
  errorText: {
    position: 'absolute',
    left: 2,
    bottom: -18,
    color: 'red',
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  loginBtn: {
    paddingVertical: 10,
    minWidth: 150,
    backgroundColor: styles.colors.lightBlue,
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  }
});
