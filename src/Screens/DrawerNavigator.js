import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
	createDrawerNavigator,
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator
} from 'react-navigation';
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

export default createAppContainer(MyDrawerNavigator);
