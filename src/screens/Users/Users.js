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
    header: header(navigation, 'Profile', 'News'),
  });

  componentDidMount() {
    this.props.getUsers(2);
  }

  render() {
    const users = this.props.users.users;
    if (users.error) {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>error</Text>
        </View>
      );
    }

    if (!users.loaded) {
      return (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (!users.data.data.length) {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>1212</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          {
            users.data.data.map((user) => {
              return (
                <View key={user.id} style={styles.container}>
                  <View>
                    <Text>{user.first_name}</Text>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )

  }
}

export default connect(
  ({ users }) => ({ users }),
  dispatch => bindActionCreators({ getUsers }, dispatch),
)(Home);
