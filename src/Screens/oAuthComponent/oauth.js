import React, { Component } from 'react';
import { connect } from 'react-redux';
import Store from '../../redux/store/index';
import store from "../../utilities/store"
import { setUserToken, setUser, setPatient,setUserRefreshToken ,setPatientLocation} from '../../redux/index';
import { Platform, Linking, View, Text, AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Storage from '../../utilities/asyncStorage';
import { callApi } from '../../utilities/serverApi';
import {timeCalculate} from "../../utilities/timeCalculate"
import axios from 'axios';
import { addUser, addUserToken,saveTrip } from '../../redux/actions/index';
class oauth extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		store.getInstance().setKeyWithRef('Login', this.props.navigation)
		Linking.getInitialURL().then((url) => {
			if (url === null){
				this.tryLogin();
			}
			// console.warn(url);
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
		if (routeName === 'reset') {
			let resetPasswordToken = routeParams[2];
			console.log(' reset');
			this.props.navigation.navigate('ResetPassword', { email: email, token: resetPasswordToken });
		}
	};
	componentWillUnmount() {
		// Linking.removeAllListeners("url");
	}
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
			await Storage.get('refreshToken').then((data)=>{
				console.log("data in asynstorage",data)
				expireTime=data.expiresIn;
				refreshToken=data.refreshToken;
			})
		    await Storage.get("user").then((data)=>{
				console.log("user data",data);
               email=data.email;
			})
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
				let fields={"patientId":{"userId":{"_id":1,"fullname": 1,"email": 1,"emergencycontactnumber":1,"contactNo":1,"picture":1}},"pickedPatient":1,"patientAddress":1,"driverAddress":1,"hospitalName":1,"hospitalAddress":1,"hospitalNo":1,"hospitalLocation":{"lat":1,"long":1},"patientLocation":{"lat":1,"long":1},"driverLocation":{"lat":1,"long":1},"driverId":{"userId":{"deleted":1,"role":1,"createdAt":1,"fullname":1,"email":1,"contactNo":1,"emailVerificationCode":1,"phoneVerified":1,"online":1,"deviceId":1,"picture":1}}}
					 if(timeCalculate(expireTime))
					 {
						 let data={"email":email,"refreshToken":refreshToken}
						callApi("post","v1/auth/refresh-token",data).then((response)=>{
							let headers = {
								'content-type': 'application/json',
								Accept: 'application/json',
								authorization: `Bearer ${response.data.accessToken}`
							};
							   console.log("refresh token",response)
							 setUserToken(response.data.accessToken);
					 setUserRefreshToken(response.data)
					callApi('get', 'v1/auth/isLogin', {}, headers)
					.then((response) => {
						setUser(response.data.userTransformed);
						Store.dispatch(addUser(response.data.userTransformed));
							callApi(
								'post',
								'v1/daffo/Trips/getOwn',
								{ perPage: 1, fields:fields,filter: { status:"Progress",driverId: response.data.userTransformed.id } },
								headers
							).then((result) => {
								console.log("results >>>>>>>>>>>>>>>>>>",result)
								result.data.length!=0 && Store.dispatch(saveTrip(result.data[0]))
								navigate('Drawer');
							}).catch(error=>{
								console.log("error",error)
							})
						console.log('response in auth', response);
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
							console.log("Response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",response.data.userTransformed)
							Store.dispatch(addUser(response.data.userTransformed));
							Store.dispatch(addUserToken(token))
						Storage.get("token").then(async (token)=>
						{
						
							await Store.dispatch(addUserToken(token));
						})
						callApi(
							'post',
							'v1/daffo/Trips/getOwn',
							{ perPage: 1, fields:fields,filter: { status:"Progress",driverId: response.data.userTransformed.id } },
							headers
						).then((result) => {
							console.log("results >>>>>>>>>>>>>>>>>>",result)
							result.data.length!=0 && Store.dispatch(saveTrip(result.data[0]))
						}).catch(error=>{
							console.log("error",error)
						})
							console.log('response in auth', response);
							navigate('Drawer');
						})
						.catch((error) => {
							console.log("error token expired",error)
							if (error.response.status === 401) navigate('Login');
							console.log('Error', error);
						});
					} 
			
			}
		} catch (err) {
			console.log('inside err', err);
			navigate('Login');
		}
	};

	render() {
		return <View/>;
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
