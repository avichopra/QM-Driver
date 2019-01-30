import React, { Component } from 'react';
import { connect } from 'react-redux';
import Store from '../../redux/store/index';
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
import store from '../../utilities/store';
import { setUserToken, setUser, setPatient, setUserRefreshToken } from '../../redux/index';
=======
import store from "../../utilities/store"
import { setUserToken, setUser, setPatient,setUserRefreshToken } from '../../redux/index';
>>>>>>>  changes app icon login rest
import { Platform, Linking, View, Text, AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Storage from '../../utilities/asyncStorage';
import { callApi } from '../../utilities/serverApi';
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
import { timeCalculate } from '../../utilities/timeCalculate';
=======
import {timeCalculate} from "../../utilities/timeCalculate"
>>>>>>>  changes app icon login rest
import axios from 'axios';
import { addUser, addUserToken } from '../../redux/actions/index';
class oauth extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
		store.getInstance().setKeyWithRef('Login', this.props.navigation);
		Linking.getInitialURL().then((url) => {
			if (url === null) {
=======
		store.getInstance().setKeyWithRef('Login', this.props.navigation)
		Linking.getInitialURL().then((url) => {
			if (url === null){
>>>>>>>  changes app icon login rest
				this.tryLogin();
			}
			console.warn(url);
			this.navigateTo(url);
		});

		setTimeout(() => {
			SplashScreen.hide();
		}, 1000);
		console.log('inside oauth ');
	}

	navigateTo = (url) => {
		console.log('Inside navigate url', url);
		if (url === null) {
			console.log('url', url);
			return;
		}
		console.log('Linking ', url);
		// E
		const { navigate } = this.props.navigation;
		const route = url.replace(/.*?:\/\//g, '');
		const routeParams = route.split('/');
		let routeName = routeParams[0];
		let email = routeParams[1];
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908

=======
		if (routeName === 'otp') {
			console.log('User in auth', email);
			this.props.navigation.navigate('OTP', { email: email });
		}
>>>>>>>  changes app icon login rest
		if (routeName === 'reset') {
			let resetPasswordToken = routeParams[2];
			console.log(' reset');
			this.props.navigation.navigate('ResetPassword', { email: email, token: resetPasswordToken });
		}
	};
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
	componentWillUnmount() {
		// Linking.removeAllListeners("url");
	}
=======
componentWillUnmount(){
	// Linking.removeAllListeners("url");
}
>>>>>>>  changes app icon login rest
	tryLogin = async () => {
		const { navigate } = this.props.navigation;
		try {
			let token;
			let expireTime;
			let refreshToken;
			let email;
			await Storage.get('token').then((data) => {
				token = data;
			});
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
			await Storage.get('refreshToken').then((data) => {
				console.log('data in asynstorage', data);
				expireTime = data.expiresIn;
				refreshToken = data.refreshToken;
			});
			await Storage.get('user').then((data) => {
				console.log('user data', data);
				email = data.email;
			});
=======
			await Storage.get('refreshToken').then((data)=>{
				console.log("data in asynstorage",data)
				expireTime=data.expiresIn;
				refreshToken=data.refreshToken;
			})
		    await Storage.get("user").then((data)=>{
				console.log("user data",data);
               email=data.email;
			})
>>>>>>>  changes app icon login rest
			console.log('after function', token);
			if (token === null) {
				throw Error('Token not found. Log-in again to proceed.');
			} else {
				// Store.getInstance().setKeyWithRef('Login', this.props.navigation);
				console.log('inside callapi');
				let headers = {
					'content-type': 'application/json',
					Accept: 'application/json',
					authorization: `Bearer ${token}`
				};
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
				if (timeCalculate(expireTime)) {
					let data = { email: email, refreshToken: refreshToken };
					callApi('post', 'v1/auth/refresh-token', data)
						.then((response) => {
=======
					 if(timeCalculate(expireTime))
					 {
						 let data={"email":email,"refreshToken":refreshToken}
						callApi("post","v1/auth/refresh-token",data).then((response)=>{
>>>>>>>  changes app icon login rest
							let headers = {
								'content-type': 'application/json',
								Accept: 'application/json',
								authorization: `Bearer ${response.data.accessToken}`
							};
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
							console.log('refresh token', response);
							setUserToken(response.data.accessToken);
							setUserRefreshToken(response.data);
							callApi('get', 'v1/auth/isLogin', {}, headers)
								.then((response) => {
									setUser(response.data.userTransformed);
									// Store.dispatch(addUser(response.data.userTransformed));
									console.log('response in auth', response);
									navigate('Drawer');
								})
								.catch((error) => {
									console.log('error token expired', error);
									if (error.response.status === 401) navigate('Login');
									console.log('Error', error);
								});
						})
						.catch((error) => {
							console.log('error in refresh token', error);
						});
				} else {
					callApi('get', 'v1/auth/isLogin', {}, headers)
						.then((response) => {
							Store.dispatch(addUser(response.data.userTransformed));
							Store.dispatch(addUserToken(token));
							// Storage.get("token").then(async (token)=>
							// {

							// 	await Store.dispatch(addUserToken(token));
							// })
=======
							   console.log("refresh token",response)
							 setUserToken(response.data.accessToken);
					 setUserRefreshToken(response.data)
					callApi('get', 'v1/auth/isLogin', {}, headers)
					.then((response) => {
						setUser(response.data.userTransformed);
						// Store.dispatch(addUser(response.data.userTransformed));
						console.log('response in auth', response);
						navigate('Drawer');
					})
					.catch((error) => {
						console.log("error token expired",error)
						if (error.response.status === 401) navigate('Login');
						console.log('Error', error);
					});
						}).catch((error)=>{
							console.log("error in refresh token",error)
						})
					
					 }
					else
					{
						callApi('get', 'v1/auth/isLogin', {}, headers)
						.then((response) => {
							Store.dispatch(addUser(response.data.userTransformed));
							Store.dispatch(addUserToken(token))
						// Storage.get("token").then(async (token)=>
						// {
						
						// 	await Store.dispatch(addUserToken(token));
						// })
>>>>>>>  changes app icon login rest
							console.log('response in auth', response);
							navigate('Drawer');
						})
						.catch((error) => {
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
							console.log('error token expired', error);
							if (error.response.status === 401) navigate('Login');
							console.log('Error', error);
						});
				}
=======
							console.log("error token expired",error)
							if (error.response.status === 401) navigate('Login');
							console.log('Error', error);
						});
					} 
			
>>>>>>>  changes app icon login rest
			}
		} catch (err) {
			console.log('inside err', err);
			navigate('Login');
		}
	};

	render() {
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
		return <View />;
=======
		return <View/>;
>>>>>>>  changes app icon login rest
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
