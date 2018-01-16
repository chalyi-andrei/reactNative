// @flow
import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import header from '../../components/header/header';
import type { SomeState } from '../../store/modules/example'
import { getUsers } from '../../store/modules/users'


import styles from './styles';


type Props = {
  example: SomeState,
  getUsers: getUsers,
};

class Home extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    header: header(navigation, 'Profile', 'Users'),
  });

  render() {

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <Text>News ...</Text>
        </ScrollView>
      </View>
    )

  }
}

export default connect(
  ({ users }) => ({ users }),
  dispatch => bindActionCreators({ getUsers }, dispatch),
)(Home);
