import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/store/index';
import { StatusBar, PermissionsAndroid } from 'react-native';
import Switchnavigator from './src/Screens/routes';
import Modal from './src/ReusableComponents/modal';
import SplashScreen from 'react-native-splash-screen';
// console.disableYellowBox = true;
import { connectToSocket } from './src/utilities/socket';
export default class App extends Component {
	componentDidMount() {
		PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			title: 'Location',
			message: 'Access your Location'
		}).then((granted) => {
			console.log('granted', granted);
			// always returns never_ask_again
		});
		connectToSocket().then((_) => {}).catch((e) => {});
		SplashScreen.hide();
	}
	render() {
		return (
			<Provider store={Store}>
				<StatusBar barStyle="light-content" hidden={false} backgroundColor="#2d76d4" />
				<Modal />
				<Switchnavigator />
			</Provider>
		);
	}
}
