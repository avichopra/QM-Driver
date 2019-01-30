import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/store/index';
import SplashScreen from 'react-native-splash-screen';

import Switchnavigator from './src/Screens/routes';
import Modal from './src/ReusableComponents/modal';
export default class App extends Component {
	componentDidMount() {
		setTimeout(() => {
			SplashScreen.hide();
		}, 1000);
	}
	render() {
		return (
			<Provider store={Store}>
				<Modal />
				<Switchnavigator />
			</Provider>
		);
	}
}
