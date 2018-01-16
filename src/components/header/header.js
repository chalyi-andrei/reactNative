import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

export default function header(navigation, leftBtn, rightBtn) {
  return (
    <View style={styles.header}>
      {
        leftBtn ? (<TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate(leftBtn)}>
          <Image
            source={{uri: 'https://www.proz.com/zf/images/default_user_512px.png'}}
            style={styles.avatar} />
        </TouchableOpacity>) : (<View />)
      }
      {
        rightBtn ? (<TouchableOpacity style={[styles.headerBtn, styles.headerBtnRight]} onPress={() => navigation.navigate(rightBtn)}>
          <Text style={styles.headerText}>{rightBtn}</Text>
        </TouchableOpacity>) : null
      }

    </View>
  );
}
