import React, { Component } from 'react';
import { connect } from 'react-redux';
import Store from '../../redux/store/index';
import { Platform, Linking, View, Text, AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Storage from '../../utilities/asyncStorage';
import { callApi } from '../../utilities/serverApi';
import axios from 'axios';
import { addUser } from '../../redux/actions/index';
class oauth extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    console.log('inside oauth ');
    this.tryLogin();
  }

  tryLogin = async () => {
    const { navigate } = this.props.navigation;
    try {
      let token;
      await Storage.get('token').then(data => {
        token = data;
      });
      console.log('after function', token);
      if (token === null) {
        throw Error('Token not found. Log-in again to proceed.');
      } else {
        console.log('inside callapi');
        let headers = {
          'content-type': 'application/json',
          Accept: 'application/json',
          authorization: `Bearer ${token}`
        };
        callApi('get', 'v1/auth/isLogin', {}, headers)
          .then(response => {
            Store.dispatch(addUser(response.data.userTransformed));
            console.log('response in auth', response);
            navigate('Drawer');
          })
          .catch(error => {
            if (error.response.status === 401) navigate('Login');
            console.log('Error', error);
          });
      }
    } catch (err) {
      console.log('inside err', err);
      navigate('Login');
    }
  };

  render() {
    return <View />;
  }
}
function mapStateToProps(state) {
  console.log('State in map state', state);
  return {
    accessToken: state.token,
    user: state.user
  };
}

export default connect(mapStateToProps)(oauth);
