// @flow
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';

import type { SomeState } from '../../store/modules/example'
import { login } from '../../store/modules/auth'


import styles from './styles';


type Props = {
  example: SomeState,
  login: login,
};

class Home extends Component<Props> {
  state = {
    data: {
      email: '',
      password: '',
      login: '',
    },
    fieldsIsValid: {
      email: false,
    }
  };

  setInputValue = (key, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [key]: value,
      },
      fieldsIsValid: {
        ...this.state.fieldsIsValid,
        [key]: validator.isEmail(value)
      },
    });
  }

  login = () => {
    console.log('state data:', this.state.data)
    const { fieldsIsValid, data } = this.state;
    if (!fieldsIsValid.email) {
      return false;
    };

    this.props.login(data)
  };

  render() {
  const { data: {email: userEmail, password: userPassword, login}, fieldsIsValid } = this. state;

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="name"
              autoCorrect={false}
              value={login}
              onChangeText={(text) => this.setInputValue('login', text)}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="email"
              autoCorrect={false}
              value={userEmail}
              onChangeText={(text) => this.setInputValue('email', text)}
            />
            {
              fieldsIsValid.email || !userEmail.length
              ? null
                : <Text style={styles.errorText}>email is not correct</Text>
            }
          </View>
          <View style={styles.row}>
            <TextInput
              secureTextEntry
              style={styles.input}
              placeholder="password"
              autoCorrect={false}
              value={userPassword}
              onChangeText={(text) => this.setInputValue('password', text)}
            />
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={this.login} style={styles.loginBtn}
              disabled={!fieldsIsValid.email}>
              <Text style={styles.loginText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )

  }
}

export default connect(
  ({ users }) => ({ users }),
  dispatch => bindActionCreators({ login }, dispatch),
)(Home);
