import React, { Component } from 'react';
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
import { Keyboard } from 'react-native';
import { isValidEmail, isValidPassword, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser, setUserRefreshToken } from '../../redux/index';
=======
import {Keyboard} from "react-native"
import { isValidEmail, isValidPassword, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser, setPatient,setUserRefreshToken } from '../../redux/index';
>>>>>>>  changes app icon login rest
import { Alert } from '../../ReusableComponents/modal';
import { get } from 'lodash';
export default class LoginBase extends Component {
	constructor(props) {
		super(props);
	}

	ChangeText = async (text, name) => {
		await this.setState({ [name]: text });
		if (name === 'email') {
			let email = checkField(name, this.state.email.trim());
			this.setState({ emailerror: email });
		} else if (name === 'password') {
			let password = checkField(name, this.state.password.trim());
			this.setState({ passworderror: password });
		}
	};
	checkAllField = () => {
		console.log(this.state.email);
		var email = isValidEmail(this.state.email.trim());
		var password = isValidPassword(this.state.password.trim());
		console.log(email, password);
		if (email === false) email = 'Enter Valid Email id';
		this.setState({
			emailerror: email,
			passworderror: password
		});
		if (email === true && password === true) {
			return true;
		}
		return false;
	};
	sendVerifationEmail = () => {
		let data = {
			email: this.state.email
		};
		callApi('post', 'v1/daffo/dispatch/resentVerificationEmail', data)
			.then((response) => {
				console.log('Response in resend', response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	onSubmit = () => {
		Keyboard.dismiss();
		const { navigate } = this.props.navigation;
		if (this.checkAllField()) {
			let data = {
				email: this.state.email.trim(),
				password: this.state.password.trim()
			};
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
			this.setState({ loading: true });
=======
			this.setState({loading:true})
>>>>>>>  changes app icon login rest
			callApi('post', 'v1/auth/login', data)
				.then((response) => {
					console.log('user details', response);
					setUser(response.data.user);
					setUserToken(response.data.token.accessToken);
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
					setUserRefreshToken(response.data.token);
					this.setState({ loading: false });
					navigate('Drawer');
=======
					setUserRefreshToken(response.data.token)
					this.setState({loading:false})
				navigate("Drawer")
>>>>>>>  changes app icon login rest

					console.log('token set');
				})
				.catch((error) => {
					console.log('Error---->', error.response);
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
					this.setState({ loading: false });
					if (error.response.data.message === 'Incorrect email') {
						this.setState({ emailerror: 'Incorrect email' });
					} else if (error.response.data.message === 'Incorrect password')
						this.setState({ passworderror: 'Incorrect password' });
					else if (!error.response.data.message.emailVerified) {
						console.log('inside verify modal');
						this.setState({ email: '', password: '' });
						Alert({
=======
					this.setState({loading:false})
					if (error.response.data.message === 'Incorrect email')
					{
						
						
						this.setState({ emailerror: 'Incorrect email'})
					}
						
					else if (error.response.data.message === 'Incorrect password')
						this.setState({ passworderror: 'Incorrect password'});
					else if (!error.response.data.message.emailVerified) {
						console.log('inside verify modal');
						this.setState({email:"",password:""})
						Alert({
              title: 'Verify Email',
>>>>>>>  changes app icon login rest
							message: 'Verify your email',
							buttons: [
								{
									title: 'Cancel',
									icon: false,
									backgroundColor: 'blue'
								},
								{
									title: 'Send Verification Email',
									onPress: this.sendVerifationEmail,
									icon: false,
									backgroundColor: 'blue'
								}
							]
						});
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
					}
=======
					} else if (!error.response.data.message.phoneVerified)
						navigate('OTP', { email: error.response.data.message.email });
>>>>>>>  changes app icon login rest
				});
		} else {
			console.log('error in validation');
		}
	};
	componentDidMount() {
		Keyboard.dismiss();
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
	}
=======
	  }
>>>>>>>  changes app icon login rest
}
