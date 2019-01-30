import React, { Component, Fragment } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import DrawerItem from '../ReusableComponents/DrawerItem';
import { connect } from 'react-redux';
import * as Storage from '../utilities/asyncStorage';

import Svg, { Path, Ellipse } from 'react-native-svg';
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
import config from '../config/index';
=======
const width = Dimensions.get('window').width;
import config from "../config/index"
>>>>>>>  changes app icon login rest
class DrawerContent extends Component {
	navigateToScreen = (route) => {
		const navigateAction = StackActions.reset({
			index: 0,
			actions: [ NavigationActions.navigate({ routeName: route }) ]
		});
		this.props.navigation.dispatch(navigateAction);
		this.props.navigation.closeDrawer();
	};
	onPressLogout = async () => {
		this.props.navigation.closeDrawer();
		await Storage.remove('token');
		await Storage.remove('user');
		this.props.navigation.navigate('Login');
	};
	render() {
		let { picture = '' } = this.props.user;
		console.log('picture>>>>>>>>>>>>>>>>>>>>>>>', picture === '');
		return (
			<View style={styles.DrawerContent}>
				<View>
					<Svg width={'100%'} height={200} style={{ backgroundColor: 'transparent' }}>
						<Ellipse cx={150} cy={45} rx={200} ry={110} fill={'#E8F0FD'} />
					</Svg>
				</View>
				<DrawerItem
					title={'Call Ambulance'}
					navigateToScreen={this.navigateToScreen}
					route={'Home'}
					// icon={<Foundation name={'home'} size={25} color={'#383838'} />
					name={'home'}
				/>
				<DrawerItem
					title={'My Profile'}
					navigateToScreen={this.navigateToScreen}
					route={'MyProfile'}
					// icon={<FontAwesome name={'user'} size={25} color={'#383838'} />}
					name={'profile'}
				/>
				<DrawerItem
					title={'Change Password'}
					navigateToScreen={this.navigateToScreen}
					route={'ChangePassword'}
					// icon={<Octicons name={'key'} size={25} color={'#383838'} />}
					name={'drawer_key'}
				/>
				<DrawerItem
					title={'History'}
					navigateToScreen={this.navigateToScreen}
					route={'History'}
					// icon={<FontAwesome name={'history'} size={25} color={'#383838'} />}
					name={'history'}
				/>
				{/* <TouchableOpacity onPress={this.onPressLogout}> */}
				<DrawerItem
					title={'Logout'}
					navigateToScreen={this.onPressLogout}
					route={'Logout'}
					// icon={<FontAwesome name={'history'} size={25} color={'#383838'} />}
					name={'logout'}
				/>
				{/* </TouchableOpacity> */}
				<View style={{ position: 'absolute', width: '100%', alignItems: 'center' }}>
					<TouchableOpacity
						style={{
							height: 100,
							width: 100,
							borderRadius: 50,
							backgroundColor: 'transparent',
							alignSelf: 'center',
							alignItems: 'center',
							marginTop: 20
							// borderColor: 'white',
							// borderWidth: 2
						}}
						onPress={() => {
							this.navigateToScreen('MyProfile');
						}}
					>
						<Image
							source={{
								uri:
									picture === ''
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
										? 'asset:/icon/def.png'
=======
										? 'asset:/images/def.png'
>>>>>>>  changes app icon login rest
										: `${config.SERVER_URL}/v1/daffo/file/${picture}`
							}}
							style={{
								height: 90,
								width: 90,
								borderRadius: 50,
								backgroundColor: 'transparent',
								borderWidth: 2,
								borderColor: 'white',
								// borderColor: 'white',
								borderWidth: 2
							}}
							// resizeMode={'contain'}
						/>
					</TouchableOpacity>
					<View style={{ width: '50%', alignItems: 'center' }}>
						<Text style={{ color: 'black' }} numberOfLines={1}>
							{this.props.user.fullname ? this.props.user.fullname : 'Name'}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	DrawerContent: { height: 800, backgroundColor: 'transparent' }
});
function mapStateToProps(state) {
	return {
		user: state.user
	};
}
export default connect(mapStateToProps)(DrawerContent);
