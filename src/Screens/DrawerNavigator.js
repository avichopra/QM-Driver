import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AppState } from 'react-native';
import {
	createDrawerNavigator,
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator
} from 'react-navigation';
import { subscribeGroups, saveSubscriptionInfo,unSubscribeSockets } from '../utilities/socket';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Foundation';

import Home from '../DrawerComponents/Home';
import History from '../DrawerComponents/History';
import MyProfile from '../DrawerComponents/MyProfile';
import ChangePassword from '../DrawerComponents/ChangePassword';
import Header from '../DrawerComponents/Header';
import Logout from '../DrawerComponents/Logout';
import DrawerContent from '../DrawerComponents/DrawerContent';
const Stack = createStackNavigator(
	{
		Home: {
			screen: Home
		},
		MyProfile: {
			screen: MyProfile
		},
		ChangePassword: {
			screen: ChangePassword
		},
		History: {
			screen: History
		},
		Logout: {
			screen: Logout
		}
	},
	{
		headerMode: 'none',
		initialRouteName: 'Home',
		navigationOptions: {
			headerVisible: false
		}
	}
);
const MyDrawerNavigator = createDrawerNavigator(
	{
		Stack: {
			screen: Stack
		}
	},
	{
		initialRouteName: 'Stack',
		drawerWidth: 300,
		contentComponent: DrawerContent
	}
);
class DrawerNavigaterWrapper extends Component
{
	static router = MyDrawerNavigator.router;
	componentWillMount() {
		// alert("jhbkl")
		console.warn('user id', this.props.user.id);
		console.warn('saving subscription info>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		saveSubscriptionInfo('DrawerNavigaterDriver', [ this.props.user.id,this.props.user.deviceId]);
	}
	componentWillUnmount(){
		unSubscribeSockets('DrawerNavigaterDriver');
	}
	render() {
		return <MyDrawerNavigator navigation={this.props.navigation} />;
	}
}
function mapStateToProps(state) {
	console.warn('user in state of drawernavigater', state);
	return {
		user: state.user
	};
}
export default connect(mapStateToProps)(DrawerNavigaterWrapper);
