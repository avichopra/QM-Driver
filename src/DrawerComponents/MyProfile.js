import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Dimensions, StyleSheet } from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../ReusableComponents/TextInput';
import Button from '../ReusableComponents/Button';
import MyProfileBase from './MyProfileBase';
import { connect } from 'react-redux';
class MyProfile extends MyProfileBase {
	static navigationOptions = {
		drawerLabel: 'My Profile',
		drawerIcon: ({ tintColor }) => <Icon name={'user'} size={25} color={'black'} />
	};
	render() {
		const height = Dimensions.get('window').height;
		const { GeneralInfoPressed, AdditionalInfoPressed } = this.state;
		let { username = '', email = '', contactNo, picture = '' } = this.props.user;
		let { vehicleNo, driverUniqueNo } = this.props.driver;
		return (
			<KeyboardAvoidingView style={styles.fg}>
				<ScrollView contentContainerStyle={styles.fg} keyboardShouldPersistTaps="always">
					<View style={styles.fg}>
						<View style={styles.ProfileHeaderHeight}>
							<Header
								title={'My Profile'}
								openDrawer={this.openDrawer}
								height={200}
								cameraClicked={this.cameraClicked}
								avatarSource={this.state.picture}
								onHandleChange={this.onHandleChange}
								name="userName"
								fieldValue={this.state.userName}
								clearName={this.clearName}
							/>
						</View>

						<View
							style={{
								height: 320,
								width: '80%',
								borderWidth: 3,
								borderRadius: 2,
								borderColor: 'rgba(178,186,187 	,0.1)',
								borderBottomWidth: 0,
								elevation: 5,
								marginVertical: 30,
								alignSelf: 'center',

								alignItems: 'center'
							}}
						>
							<TextField
								placeholder={'Email'}
								icon={'envelope'}
								onHandleChange={this.onHandleChange}
								field={'email'}
								fieldValue={email}
								editable={false}
							/>
							<TextField
								placeholder={'Contact No.'}
								icon={'call_answer_grey'}
								onHandleChange={this.onHandleChange}
								field={'contactNo'}
								fieldValue={this.state.contactNo}
								error={this.state.contactNoError}
								// error={this.state.GeneralInfo.contactNoError}
								keyboardType={'numeric'}
							/>
							<TextField
								placeholder={'Vehicle Number'}
								icon={'ambulance'}
								// onHandleChange={this.onHandleChange}
								// field={'vehicleNo'}
								editable={false}
								fieldValue={vehicleNo}
								// error={this.state.GeneralInfo.emergencyContactNoError}
								keyboardType={'numeric'}
							/>
							<TextField
								placeholder={'Driver Unique Number'}
								icon={'driver'}
								// onHandleChange={this.onHandleChange}
								// field={'DUN'}
								fieldValue={driverUniqueNo}
								editable={false}
								// error={this.state.GeneralInfo.emergencyContactNoError}
								keyboardType={'numeric'}
							/>
						</View>

						<View
							style={{
								flexGrow: 1,
								width: '100%',
								alignItems: 'center',
								justifyContent: 'flex-end',
								marginVertical: 30
							}}
						>
							<Button
								title={'Save'}
								backgroundColor={'#2d76d4'}
								onSave={this.onSave}
								loading={this.state.loading}
							/>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.user,
		token: state.token,
		driver: state.driver
	};
}
const styles = StyleSheet.create({
	fg: { flexGrow: 1 },
	ProfileHeaderHeight: { height: 200 },
	InfoView: {
		height: 60,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center'
	},
	center: { alignItems: 'center', justifyContent: 'center' },
	GInfo: {
		width: '48%',
		borderRightWidth: 1,
		borderRightColor: '#B1B1B1'
	}
});
export default connect(mapStateToProps)(MyProfile);
