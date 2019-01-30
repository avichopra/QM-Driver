import React, { Component } from 'react';
import { Header } from 'react-navigation';
import {
	View,
	Image,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView,
	ImageBackground,
	StatusBar,
	Linking,
	ActivityIndicator
} from 'react-native';
import SignupBase from './signupBase';
import style from '../../styles/index';
import Text from '../../component/CustomComponent/text';
import Button from '../../component/CustomComponent/button';
import Textinput from '../../component/CustomComponent/Textinput';
import SplashScreen from 'react-native-splash-screen';
import GenericModal from '../../ReusableComponents/modal';
export default class Login extends SignupBase {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={style.f1} keyboardShouldPersistTaps='always'>
					{/* <StatusBar barStyle='light-content' hidden={true} backgroundColor='blue' /> */}

					<ImageBackground
						source={{ uri: 'asset:/icon/group_2.png' }}
						style={[ style.d1 ]}
						resizeMode={'stretch'}
					>
						<View style={style.d3}>
							<Image source={{ uri: 'asset:/icon/group.png' }} style={[ style.a1, style.d2 ]} />
						</View>
						<View>
							<View style={[ style.d4 ]}>
								<View>
									<Image
										source={{ uri: 'asset:/icon/avatar.png' }}
										style={[ style.d6, style.d3 ]}
										resizeMode="contain"
									/>
								</View>
								<View style={style.f8}>
									<Textinput
										onChangeText={(text) => {
											this.ChangeText(text, 'FullName');
										}}
										value={this.state.FullName}
									>
										Full Name
									</Textinput>
								</View>
							</View>
							<Text style={{ color: 'red' }}>{this.state.fullnameerror}</Text>
							<View style={style.d4}>
								<View>
									<Image
										source={{ uri: 'asset:/icon/mail_copy.png' }}
										style={{ width: 40, height: 15, marginVertical: 30 }}
										resizeMode="contain"
									/>
								</View>
								<View
									style={[
										style.f8,
										{
											flexDirection: 'column'
										}
									]}
								>
									<Textinput
										keyboardType={'email-address'}
										onChangeText={(text) => {
											this.ChangeText(text, 'Email');
										}}
										value={this.state.Email}
									>
										Email
									</Textinput>
								</View>
							</View>
							<Text style={{ color: 'red' }}>{this.state.emailerror}</Text>
							<View style={style.d4}>
								<View>
									<Image
										source={{ uri: 'asset:/icon/shape_copy.png' }}
										style={{ width: 40, height: 20, marginVertical: 30 }}
										resizeMode="contain"
									/>
								</View>
								<View
									style={[
										style.f8,
										{
											flexDirection: 'column'
										}
									]}
								>
									<Textinput
										keyboardType={'numeric'}
										maxLength={10}
										onChangeText={(text) => {
											this.ChangeText(text, 'contactnumber');
										}}
										value={this.state.contactnumber}
									>
										Contact Number
									</Textinput>
								</View>
							</View>
							<Text style={{ color: 'red' }}>{this.state.contacterror}</Text>
							<View style={style.d4}>
								<View>
									<Image
										source={{ uri: 'asset:/icon/shape_copy.png' }}
										style={{ width: 40, height: 20, marginVertical: 30 }}
										resizeMode="contain"
									/>
								</View>
								<View
									style={[
										style.f8,
										{
											flexDirection: 'column'
										}
									]}
								>
									<Textinput
										keyboardType={'numeric'}
										maxLength={10}
										onChangeText={(text) => {
											this.ChangeText(text, 'emergencycontactnumber');
										}}
										value={this.state.emergencycontactnumber}
									>
										Emergency Contact Number
									</Textinput>
								</View>
							</View>
							<Text style={{ color: 'red' }}>{this.state.emergencycontacterror}</Text>
							<View style={style.d4}>
								<Image
									source={{ uri: 'asset:/icon/lock.png' }}
									style={{ width: 40, height: 20, marginVertical: 30 }}
									resizeMode="contain"
								/>

								<View style={style.f8}>
									<Textinput
										secureTextEntry={true}
										onChangeText={(text) => {
											this.ChangeText(text, 'password');
										}}
										value={this.state.password}
									>
										Password
									</Textinput>
								</View>
							</View>
							<Text style={{ color: 'red' }}>{this.state.passworderror}</Text>
							<View style={style.d4}>
								<View>
									<Image
										source={{ uri: 'asset:/icon/lock.png' }}
										style={{ width: 40, height: 20, marginVertical: 30 }}
										resizeMode="contain"
									/>
								</View>
								<View style={style.f8}>
									<Textinput
										secureTextEntry={true}
										onChangeText={(text) => {
											this.ChangeText(text, 'confirmpassword');
										}}
										value={this.state.confirmpassword}
									>
										Confirm Password
									</Textinput>
								</View>
							</View>
							<Text style={{ color: 'red' }}>{this.state.confirmpassworderror}</Text>
						</View>
						<View style={style.a9}>

							{this.state.loading===false?<Button style={style.a10} onPress={this.onSubmit}>
								<Text style={style.f10}>SIGN UP</Text>
							</Button>:<View style={style.a10}><ActivityIndicator size="large" color="#000" /></View>}
                                
							<Button
								style={style.a11}
								onPress={() => {
									this.props.navigation.navigate('Login');
								}}
							>
								<Text style={[ style.f10, { color: 'white' } ]}>SIGN IN</Text>
							</Button>
						</View>
						<GenericModal
							modalVisible={this.state.modalVisible}
							firstTitle={'Ok'}
							secondTitle={'Resend Email'}
							firstOnPress={this.setModalVisible}
						/>
					</ImageBackground>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
