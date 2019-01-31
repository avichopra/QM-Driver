import { Component } from 'react';
import axios from 'axios';
import { isValidOTP, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser, setUserRefreshToken } from '../../redux/index';
import { Alert } from '../../ReusableComponents/modal';
export default class resetBase extends Component {
	componentDidMount() {
		console.warn('did mount being called');
		const { navigation } = this.props;
		const otp = navigation.getParam('otp');
		const user = navigation.getParam('user');
		console.log('Parameter', otp, user);
	}
	checkAllMandatoryField = () => {
		var otp = isValidOTP(this.state.otp);
		this.setState({
			otperror: otp
		});
		if (otp === true) return true;
		return false;
	};
	ChangeText = async (text, name) => {
		await this.setState({ [name]: text });
		if (name === 'otp') {
			let otp = checkField('OTP', this.state.otp);
			this.setState({ otperror: otp });
		}
	};
	onSubmit = () => {
		if (this.checkAllMandatoryField()) {
			this.setState({ loading: true });
			let data = {
				email: this.props.user.email,
				otp: this.state.otp,
				contactNo: this.props.navigation.state.params.contactNo
			};

			callApi('post', 'v1/daffo/dispatch/otpVerification', data)
				.then((response) => {
					this.setState({ loading: false });
					Alert({
						title: 'Verification',
						message: 'Your number has been verified',
						buttons: [ { title: 'OK', backgroundColor: '#1A5276' } ]
					});
					setUser(response.data.user);
					this.props.navigation.navigate('MyProfile');
				})
				.catch((error) => {
					this.setState({ otperror: error.response.data.message, loading: false });
					console.log(error);
				});
		} else {
			console.log('error');
		}
	};
	resendOTP = () => {
		console.warn('resend otp being called');
		this.setState({ loading: true });
		let data = { email: this.props.user.email };
		callApi('post', 'v1/daffo/dispatch/reSendOtp', data)
			.then((response) => {
				if (response.status === 200) {
					this.setState({ otperror: 'OTP sent successfully', loading: false });
				}
				console.log('Response in resend otp', response);
			})
			.catch((error) => {
				console.log('inside error', error.response.data);
			});
	};
}
