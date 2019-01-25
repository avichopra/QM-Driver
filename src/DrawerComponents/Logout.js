import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Logout extends Component {
	constructor(props) {
		super(props);
	}
	static navigationOptions = {
		drawerLabel: 'Logout',
		drawerIcon: ({ tintColor }) => (
			// <Image source={require('./chats-icon.png')} style={[ styles.icon, { tintColor: tintColor } ]} />
			<Icon name={'logout'} size={25} color={'black'} />
		)
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	render() {
		return (
			// <View>
			<Header title={'Quick Medic'} openDrawer={this.openDrawer} />
			/* <TouchableOpacity onPress={this.openDrawer}>
					<Text>Logout</Text>
				</TouchableOpacity> */
			// </View>
		);
	}
}
export default Logout;
