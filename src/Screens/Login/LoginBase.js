import React, { Component } from 'react';
import {Keyboard} from "react-native"
import { isValidEmail, isValidPassword, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser, setPatient,setUserRefreshToken } from '../../redux/index';
import { Alert } from '../../ReusableComponents/modal';
import { get } from 'lodash';
export default class LoginBase extends Component {
	constructor(props) {
		super(props);
	}

	ChangeText = async (text, name) => {
		await this.setState({ [name]: text });
		if (name === 'email') {
			let email = checkField("Email", this.state.email.trim());
			this.setState({ emailerror: email });
		} else if (name === 'password') {
			let password = checkField("Password", this.state.password.trim());
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
			this.setState({loading:true})
			callApi('post', 'v1/auth/login', data)
				.then((response) => {
					console.log('user details', response);
					setUser(response.data.user);
					setUserToken(response.data.token.accessToken);
					setUserRefreshToken(response.data.token)
					this.setState({loading:false})
				navigate("Drawer")

					console.log('token set');
				})
				.catch((error) => {
					console.log('Error---->', error.response);
					this.setState({loading:false})
					if (error.response.data.message === 'Incorrect email')
					{
						
						
						this.setState({ emailerror: 'Incorrect email'})
					}
						
					else if (error.response.data.message === 'Incorrect password')
						this.setState({ passworderror: 'Incorrect password'});
						else if (!error.response.data.message.phoneVerified)
						{
							navigate('OTP', { email: error.response.data.message.email,routeName:"Drawer" });
						}
						
				});
		} else {
			console.log('error in validation');
		}
	};
	componentDidMount() {
		Keyboard.dismiss();
	}
}
