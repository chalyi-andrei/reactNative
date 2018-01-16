// @flow
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';

import Start from './screens/Start/Start';
import Users from './screens/Users/Users';
import Profile from './screens/Profile/Profile';
import News from './screens/News/News';


export const initialRouteName = 'Start';

const ScreensRouter = StackNavigator(
  {
    Start: { screen: Start },
    Users: { screen: Users },
    Profile: { screen: Profile },
    News: { screen: News },
  },
  {
    initialRouteName,
  },
);

export const Router = StackNavigator(
  {
    Screens: { screen: ScreensRouter },
    // Modals
  },
  {
    initialRouteName: 'Screens',
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
  },
);

type Props = {
  dispatch: Function,
  navigation: Object,
};

class Navigator extends Component<Props> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigation } = this.props;
    // We should check all nested navigators
    // I'm the lucky and have only one of it.
    if (navigation.index === 0 && navigation.routes[0].index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    return (
      <Router
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation,
        })}
      />
    );
  }
}

export default connect(({ navigation }) => ({ navigation }))(Navigator);
