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
	KeyboardAvoidingView,
	ActivityIndicator,
	StatusBar
} from 'react-native';
import Textinput from '../../component/CustomComponent/Textinput';
import style from '../../styles/index';
import Base from './LoginBase';
import SplashScreen from 'react-native-splash-screen';
import Loading from '../../ReusableComponents/loading';

export default class Login extends Base {
	constructor(props) {
		super(props);
		this.state = {
			email: 'naveksha.jain@daffodilsw.com',
			password: '123456789',
			emailerror: '',
			passworderror: '',
			loading:false
		};
	}
	// componentDidMount() {
	// 	Linking.addEventListener("url", this.handleOpenURL);
	// 	AppState.addEventListener("change", this._handleAppStateChange);
	// }
	// componentWillUnmount() {
	//   AppState.removeEventListener('change', this._handleAppStateChange);
	// }
	// handleOpenURL = event => {
	//   console.log('inside handle', event);
	//   this.navigate(event.url);
	// };
	// _handleAppStateChange = () => {
	// 	if (Platform.OS === "android") {
	// 	  Linking.getInitialURL().then(url => {
	// 		this.navigate(url);
	// 	  });
	// 	}
	//   };
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
		// console.warn("hiiiiiiiiiiiiiiiiii")
		return (
			<KeyboardAvoidingView style={{ flex: 1 }} >
			
				<ScrollView contentContainerStyle={style.f1} keyboardShouldPersistTaps='always'>
					<ImageBackground
						source={{ uri: 'asset:/icon/group_2.png' }}
						style={style.d1}
						resizeMode={'stretch'}
					>
						<View style={style.f1}>
							<Image source={{ uri: 'asset:/icon/group.png' }} style={[ style.d2, style.a1 ,{marginTop:30}]} />
							<Text style={{alignSelf:"center",color:"#ffffff",fontSize:11,fontFamily:"NunitoSans-Regular"}}>Driver App</Text>
						</View>
						
						<View style={style.f1}>
							<View style={style.d4}>
								<Image
									source={{ uri: 'asset:/icon/mail_copy.png' }}
									style={style.d5}
									resizeMode="contain"
								/>

								<View style={style.f8}>
									<Textinput
										onChangeText={(text) => {
											this.ChangeText(text, 'email');
										}}
										value={this.state.email}
									>
										Email
									</Textinput>
								</View>
							</View>
							<Text style={style.c1}>{this.state.emailerror}</Text>
							<View style={style.d4}>
								<Image
									source={{ uri: 'asset:/icon/lock.png' }}
									style={[ style.d6, style.d3 ]}
									resizeMode="contain"
								/>

								<View style={style.f3}>
									<Textinput
										secureTextEntry={true}
										onChangeText={(text) => {
											this.ChangeText(text, 'password');
										}}
										value={this.state.password}
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
						<View style={[ style.j1, style.f1 ]}>
							{this.state.loading===false?<TouchableOpacity style={style.c2} onPress={this.onSubmit} accessible={false}>
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
							</TouchableOpacity>:<View style={style.c2}><ActivityIndicator size="large" color="#000" /></View>}
						</View>
					</ImageBackground>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
