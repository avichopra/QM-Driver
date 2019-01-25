import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/Foundation';
import SplashScreen from 'react-native-splash-screen';

class Home extends Component {
	constructor(props) {
		super(props);
	}
	static navigationOptions = {
		drawerLabel: 'Home',
		drawerIcon: ({ tintColor }) => (
			// <Image source={require('./chats-icon.png')} style={[ styles.icon, { tintColor: tintColor } ]} />
			<Icon name={'home'} size={25} color={'black'} />
		)
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	componentDidMount() {
		setTimeout(() => {
			SplashScreen.hide();
		}, 2000);
	}

	render() {
		return (
			// <View>
			<Header title={'Quick Medic'} openDrawer={this.openDrawer} />
			/* <TouchableOpacity onPress={this.openDrawer}>
					<Text>Home</Text>
				</TouchableOpacity> */
			// </View>
		);
	}
}
export default Home;
