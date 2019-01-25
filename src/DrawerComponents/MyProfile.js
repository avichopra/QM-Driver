import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../ReusableComponents/TextInput';
import Button from '../ReusableComponents/Button';
import MyProfileBase from './MyProfileBase';
class MyProfile extends MyProfileBase {
	static navigationOptions = {
		drawerLabel: 'My Profile',
		drawerIcon: ({ tintColor }) => <Icon name={'user'} size={25} color={'black'} />
	};

	render() {
		console.log('avatarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', this.state.avatarSource);

		const height = Dimensions.get('window').height;
		const { GeneralInfoPressed, AdditionalInfoPressed } = this.state;
		return (
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<View style={{ flexGrow: 1 }}>
						<View style={{ height: 200 }}>
							<Header
								title={'My Profile'}
								openDrawer={this.openDrawer}
								height={200}
								cameraClicked={this.cameraClicked}
								avatarSource={this.state.avatarSource}
							/>
						</View>
						<View
							style={{
								height: 60,
								width: '100%',
								flexDirection: 'row',
								alignItems: 'center'
								// flexGrow: 1,
							}}
						>
							<TouchableOpacity
								style={{
									width: '48%',
									borderRightWidth: 1,
									borderRightColor: '#B1B1B1',
									alignItems: 'center',
									justifyContent: 'center'
								}}
								onPress={this.GeneralInfoPressed}
							>
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
								/>
								<TextField
									placeholder={'Contact No.'}
									icon={'call_answer_grey'}
									onHandleChange={this.onHandleChange}
									field={'GeneralInfo'}
									value={'contactNo'}
								/>
								<TextField
									placeholder={'Emergency Contact No.'}
									icon={'call_answer_grey'}
									onHandleChange={this.onHandleChange}
									field={'GeneralInfo'}
									value={'emergencyContactNo'}
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
								/>
								<TextField
									placeholder={'Blood Group'}
									icon={'blood'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'bloodGroup'}
								/>
								<TextField
									placeholder={'Emergency Contact No.'}
									icon={'call_answer_grey'}
									onHandleChange={this.onHandleChange}
									field={'GeneralInfo'}
									value={'emergencyContactNo'}
								/>
								<TextField
									placeholder={'Relation with Patient'}
									icon={'relation'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'relationWithPatient'}
								/>
							</View>
						)}
						<View
							style={{
								flexGrow: 1,
								width: '100%',
								alignItems: 'center',
								justifyContent: 'flex-end',
								marginVertical: 30
							}}
						>
							<Button title={'Save'} backgroundColor={'#443BFF'} onSave={this.onSave} />
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
export default MyProfile;
