import React, { Component } from 'react';
import { Text, View, Image, KeyboardAvoidingView, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Header from './Header';
import Button from '../ReusableComponents/Button';
import TextField from '../ReusableComponents/TextInput';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class ChangePassword extends Component {
	static navigationOptions = {
		drawerLabel: 'Change Password',
		drawerIcon: ({ tintColor }) => (
			// <Image source={require('./chats-icon.png')} style={[ styles.icon, { tintColor: tintColor } ]} />
			<Icon name={'key'} size={25} color={'black'} />
		)
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};

	render() {
		return (
			<KeyboardAvoidingView>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ height: '100%' }}>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<View style={{ flexGrow: 1, width: '100%' }}>
							<Header title={'Change Password'} openDrawer={this.openDrawer} />
						</View>
						<View
							style={{
								flexGrow: 1,
								alignSelf: 'center',
								width: '50%'
								// height: height * 0.227,
								// marginBottom: height * 0.051
							}}
						>
							<Image source={{ uri: 'mipmap/aid' }} style={{ height: height * 0.227, width: '100%' }} />
						</View>
						<View
							style={{
								height: 230,
								// flexGrow: 1,
								// width: '80%',
								// justifyContent: 'center',
								borderWidth: 3,
								borderRadius: 2,
								borderColor: 'rgba(178,186,187 	,0.1)',
								borderBottomWidth: 0,
								elevation: 5,
								marginVertical: 30,
								// marginBottom: height * 0.132,
								// backgroundColor: 'green',
								// marginLeft: 5,
								// marginRight: 5,
								alignItems: 'center'
							}}
						>
							<TextField placeholder={'Old Password'} icon={'key'} />
							<TextField placeholder={'New Password'} icon={'key'} />
							<TextField placeholder={'Confirm New Password'} icon={'key'} />
						</View>
						<View
							style={{
								flexGrow: 1,
								// height: height * 0.061,
								width: '100%',
								alignItems: 'center',
								justifyContent: 'flex-end',
								// backgroundColor: 'red',
								marginVertical: height * 0.044
							}}
						>
							<Button title={'Save'} backgroundColor={'#443BFF'} />
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

{
	/* <KeyboardAvoidingView>
<ScrollView showsVerticalScrollIndicator={false}>
	<View style={{ flex: 1, alignItems: 'center' }}>
		<View style={{ height: 40, width: '100%', marginBottom: height * 0.051 }}>
			<Header title={'Change Password'} openDrawer={this.openDrawer} />
		</View>
		<View
			style={{
				alignSelf: 'center',
				height: height * 0.227,
				backgroundColor: 'coral',
				marginBottom: height * 0.051
			}}
		>
			<Image
				source={{ uri: 'asset:/images/group_3.png' }}
				style={{ height: height * 0.227, width: 160 }}
			/>
		</View>
		<View
			style={{
				height: height * 0.319,
				// width: '80%',
				// justifyContent: 'center',
				backgroundColor: 'yellow',
				borderWidth: 3,
				borderRadius: 2,
				borderColor: 'rgba(178,186,187 	,0.1)',
				borderBottomWidth: 0,
				elevation: 5,
				marginBottom: height * 0.132,
				// backgroundColor: 'green',
				// marginLeft: 5,
				// marginRight: 5,
				alignItems: 'center'
			}}
		>
			<TextField placeholder={'Old Password'} />
			<TextField placeholder={'New Password'} />
			<TextField placeholder={'Confirm New Password'} />
		</View>
		<View
			style={{
				// flexGrow: 2,
				height: height * 0.061,
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'red'
				// backgroundColor: 'red'
			}}
		>
			<Button title={'Save'} backgroundColor={'#443BFF'} />
		</View>
	</View>
</ScrollView>
</KeyboardAvoidingView> */
}
