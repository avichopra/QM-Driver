import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';

class History extends Component {
	constructor(props) {
		super(props);
	}
	static navigationOptions = {
		drawerLabel: 'History',
		drawerIcon: ({ tintColor }) => (
			// <Image source={require('./chats-icon.png')} style={[ styles.icon, { tintColor: tintColor } ]} />
			<Icon name={'history'} size={25} color={'black'} />
		)
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	render() {
		return (
			// <View>
			<Header title={'History'} openDrawer={this.openDrawer} />
			/* <TouchableOpacity onPress={this.openDrawer}>
					<Text>History</Text>
				</TouchableOpacity> */
			// </View>
		);
	}
}
export default History;