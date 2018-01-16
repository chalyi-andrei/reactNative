// @flow
import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import header from '../../components/header/header';
import type { SomeState } from '../../store/modules/example'
import { logout } from '../../store/modules/auth'


import styles from './styles';


type Props = {
  example: SomeState,
  getUsers: getUsers,
};

class Profile extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    header: header(navigation, null, 'Users'),
  });

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <View>
            <TouchableOpacity onPress={this.props.logout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )

  }
}

export default connect(
  ({ users }) => ({ users }),
  dispatch => bindActionCreators({ logout }, dispatch),
)(Profile);
