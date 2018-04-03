// @flow
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';

import { login } from '../../store/modules/auth';


import styles from './styles';


type PropsT = {
  login: typeof login,
};

type StateT = {
  data: {
    email: ?string,
    password: ?string,
  },
  fieldsIsValid: {
    email: boolean
  },
};

class Home extends Component<PropsT, StateT> {
  state = {
    data: {
      email: '',
      password: '',
    },
    fieldsIsValid: {
      email: false,
    },
  };

  setInputValue = (key: string, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [key]: value,
      },
      fieldsIsValid: {
        ...this.state.fieldsIsValid,
        [key]: validator.isEmail(value),
      },
    });
  }

  login = () => {
    const { fieldsIsValid, data } = this.state;
    if (!fieldsIsValid.email) {
      return false;
    };

    this.props.login({ email: data.email, password: data.password });
  };

  render() {
    const { data: {email: userEmail, password: userPassword}, fieldsIsValid } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
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
              onPress={this.login}
              style={styles.loginBtn}
              disabled={!fieldsIsValid.email}
            >
              <Text style={styles.loginText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  ({ users }) => ({ users }),
  dispatch => bindActionCreators({ login }, dispatch),
)(Home);
