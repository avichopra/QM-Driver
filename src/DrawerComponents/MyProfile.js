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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
		let { username = '', email = '', contactNo, picture = '' } = this.props.user;
		let { vehicleNo, driverUniqueNo } = this.props.driver;
		return (
			<KeyboardAvoidingView style={styles.fg}>
				<ScrollView contentContainerStyle={styles.fg}>
=======
		let { bloodGroup = '', address = '', relationWithPatient = '', emergencyContactNo } = this.state.AdditionalInfo;
		let { username = '', email = '', contactNo = '', picture = '' } = this.props.user;
		let ECN = this.state.GeneralInfo.emergencyContactNo;
		return (
			<KeyboardAvoidingView style={styles.fg}>
				<ScrollView contentContainerStyle={styles.fg} keyboardShouldPersistTaps="always">
>>>>>>>  changes app icon login rest
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
							/>
						</View>
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908

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
							/>
							<TextField
								placeholder={'Contact No.'}
								icon={'call_answer_grey'}
								onHandleChange={this.onHandleChange}
								field={'contactNo'}
								fieldValue={this.state.contactNo}
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

=======
						<View style={styles.InfoView}>
							<TouchableOpacity style={[ styles.GInfo, styles.center ]} onPress={this.GeneralInfoPressed}>
								<Text
									style={[
										GeneralInfoPressed && true ? { color: 'black' } : { color: '#B1B1B1' },
										{ fontSize: 18 }
									]}
								>
									General Info
								</Text>
								{GeneralInfoPressed && true ? (
									<View
										style={{ height: 1.5, backgroundColor: 'blue', width: '60%', marginTop: 5 }}
									/>
								) : (
									<View style={{ height: 1.5, width: '60%', marginTop: 5 }} />
								)}
							</TouchableOpacity>
							<TouchableOpacity
								style={{ width: '48%', alignItems: 'center', justifyContent: 'center' }}
								onPress={this.AdditionalInfoPressed}
							>
								<Text
									style={[
										AdditionalInfoPressed && true ? { color: 'black' } : { color: '#B1B1B1' },
										{ fontSize: 18 }
									]}
								>
									Additional Info
								</Text>
								{AdditionalInfoPressed && true ? (
									<View
										style={{ height: 1.5, backgroundColor: 'blue', width: '60%', marginTop: 5 }}
									/>
								) : (
									<View style={{ height: 1.5, width: '60%', marginTop: 5 }} />
								)}
							</TouchableOpacity>
						</View>
						{!(AdditionalInfoPressed && true) ? (
							<View
								style={{
									height: 230,
									width: '80%',
									borderWidth: 3,
									borderRadius: 2,
									borderColor: 'rgba(178,186,187 	,0.1)',
									borderBottomWidth: 0,
									elevation: 5,
									marginVertical: 10,
									alignSelf: 'center',

									alignItems: 'center'
								}}
							>
								<TextField
									placeholder={'Email'}
									icon={'envelope'}
									onHandleChange={this.onHandleChange}
									field={'GeneralInfo'}
									value={'email'}
									fieldValue={email}
								/>
								<TextField
									placeholder={'Contact No.'}
									icon={'call_answer_grey'}
									onHandleChange={this.onHandleChange}
									field={'GeneralInfo'}
									value={'contactNo'}
									fieldValue={contactNo}
									error={this.state.GeneralInfo.contactNoError}
									keyboardType={'numeric'}
								/>
								<TextField
									placeholder={'Emergency Contact No.'}
									icon={'call_answer_grey'}
									onHandleChange={this.onHandleChange}
									field={'GeneralInfo'}
									value={'emergencyContactNo'}
									error={this.state.GeneralInfo.emergencyContactNoError}
									keyboardType={'numeric'}
									fieldValue={ECN}
								/>
							</View>
						) : (
							<View
								style={{
									height: 300,
									width: '80%',
									borderWidth: 3,
									borderRadius: 2,
									borderColor: 'rgba(178,186,187 	,0.1)',
									borderBottomWidth: 0,
									elevation: 5,
									marginVertical: 10,
									alignSelf: 'center',

									alignItems: 'center'
								}}
							>
								<TextField
									placeholder={'Address'}
									icon={'pin'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'address'}
									fieldValue={address}
								/>
								<TextField
									placeholder={'Blood Group'}
									icon={'blood'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'bloodGroup'}
									fieldValue={bloodGroup}
								/>
								<TextField
									placeholder={'Emergency Contact No.'}
									icon={'call_answer_grey'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'emergencyContactNo'}
									fieldValue={emergencyContactNo}
									keyboardType={'numeric'}
								/>
								<TextField
									placeholder={'Relation with Patient'}
									icon={'relation'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'relationWithPatient'}
									fieldValue={relationWithPatient}
								/>
							</View>
						)}
>>>>>>>  changes app icon login rest
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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
								backgroundColor={'#443BFF'}
=======
								backgroundColor={'#2d76d4'}
>>>>>>>  changes app icon login rest
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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
	console.log('I am the stateeeeeeeeeeeeeeeeeeeeeeeeeeee', state);
	return {
		user: state.user,
		token: state.token,
		driver: state.driver
=======
	console.warn('I am the stateeeeeeeeeeeeeeeeeeeeeeeeeeee', state);
	return {
		user: state.user,
		token: state.token,
		patient: state.patient
>>>>>>>  changes app icon login rest
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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
=======
		// flexGrow: 1,
>>>>>>>  changes app icon login rest
	},
	center: { alignItems: 'center', justifyContent: 'center' },
	GInfo: {
		width: '48%',
		borderRightWidth: 1,
		borderRightColor: '#B1B1B1'
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
=======
		// alignItems: 'center',
		// justifyContent: 'center'
>>>>>>>  changes app icon login rest
	}
});
export default connect(mapStateToProps)(MyProfile);
