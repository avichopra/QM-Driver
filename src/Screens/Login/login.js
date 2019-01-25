import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  Linking,
  AppState,
  KeyboardAvoidingView
} from 'react-native';
import Textinput from '../../component/CustomComponent/Textinput';
import style from '../../styles/index';
import Base from './LoginBase';
import SplashScreen from 'react-native-splash-screen';
export default class Login extends Base {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailerror: '',
      passworderror: ''
    };
  }
  componentDidMount() {
    // Linking.addEventListener('url', this.handleOpenURL);
    // Linking.getInitialURL().then(url => {
    //   if (url != null) this.navigate(url);
    // });
    // if (Platform.OS === 'android') {
    //   AppState.addEventListener('change', this._handleAppStateChange);
    // }
  }
  // componentWillUnmount() {
  //   AppState.removeEventListener('change', this._handleAppStateChange);
  // }
  // handleOpenURL = event => {
  //   console.log('inside handle', event);
  //   this.navigate(event.url);
  // };
  // _handleAppStateChange = nextAppState => {
  //   console.log('inside app state change', nextAppState);
  //   if (Platform.OS === 'android') {
  //     Linking.getInitialURL().then(url => {
  //       // if (url === null) return;
  //       this.navigate(url);
  //     });
  //   }
  // };
  // navigate = url => {
  //   console.log('Inside navigate url', url);
  //   if (url === null) {
  //     console.log('url', url);
  //     return;
  //   }
  //   console.log('Linking ', url);
  //   // E
  //   const { navigate } = this.props.navigation;
  //   const route = url.replace(/.*?:\/\//g, '');
  //   const routeParams = route.split('/');
  //   let routeName = routeParams[0];
  //   let email = routeParams[1];
  //   if (routeName === 'otp') {
  //     console.log('User in auth', email);
  //     navigate('OTP', { email: email });
  //   }
  //   if (routeName === 'reset') {
  //     let resetPasswordToken = routeParams[2];
  //     console.log('inside reset');
  //     navigate('ResetPassword', { email: email, token: resetPasswordToken });
  //   }
  // };
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={style.f1}>
          <ImageBackground source={{ uri: 'asset:/icon/group_2.png' }} style={style.d1} resizeMode={'stretch'}>
            <View style={style.f1}>
              <Image source={{ uri: 'asset:/icon/group.png' }} style={[style.d2, style.d3, style.a1]} />
            </View>
            <View style={style.f1}>
              <View style={style.d4}>
                <Image source={{ uri: 'asset:/icon/mail_copy.png' }} style={style.d5} resizeMode='contain' />

                <View style={style.f8}>
                  <Textinput
                    onChangeText={text => {
                      this.ChangeText(text, 'email');
                    }}
                  >
                    Email
                  </Textinput>
                </View>
              </View>
              <Text style={style.c1}>{this.state.emailerror}</Text>
              <View style={style.d4}>
                <Image source={{ uri: 'asset:/icon/lock.png' }} style={[style.d6, style.d3]} resizeMode='contain' />

                <View style={style.f3}>
                  <Textinput
                    secureTextEntry={true}
                    onChangeText={text => {
                      this.ChangeText(text, 'password');
                    }}
                  >
                    Password
                  </Textinput>
                </View>

                <Text
                  style={{ fontSize: 12, color: 'white', marginVertical: 20 }}
                  onPress={() => {
                    this.props.navigation.navigate('Reset');
                  }}
                >
                  Forgot Password?
                </Text>
              </View>
              <Text style={style.c1}>{this.state.passworderror}</Text>
            </View>
            <View style={[style.j1, style.f1]}>
              <View style={style.d7}>
                <Text style={[style.i1, { fontSize: 12 }]}>Dont have an account? &nbsp;</Text>

                <Text
                  onPress={() => {
                    this.props.navigation.navigate('SignUp');
                  }}
                  style={style.i1}
                >
                  Create One
                </Text>
              </View>
              <TouchableOpacity style={style.c2} onPress={this.onSubmit}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 13,
                    fontSize: 14,
                    color: '#2948ff',
                    fontFamily: 'Nunito Bold'
                  }}
                >
                  SIGN IN
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
