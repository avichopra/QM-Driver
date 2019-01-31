import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { callApi } from '../utilities/serverApi';
import ImageResizer from 'react-native-image-resizer';

import SplashScreen from 'react-native-splash-screen';
import ImagePicker from 'react-native-image-picker';
import { setUser, setDriver } from '../redux/index';
import { Alert } from '../ReusableComponents/modal';
import Axios from 'axios';
export default class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			contactNo: '',

			imageSelected: false,
			profileImage: '',
			userName: '',
			avatarSource: null,
			picture: '',
			userName: '',
			loading: false
		};
	}

	onHandleChange = (name, value, field) => {
		if (field) {
			this.state[field] = value;
			this.setState({});
		} else {
			this.state[name] = value;
			this.setState({});
		}
		console.log('this.state>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.state);
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	goToOtp = () => {
		this.props.navigation.navigate('OTP', { contactNo: this.state.contactNo });
	};
	checkPhoneVerified = () => {
		console.warn('phn vrr', this.props.user.phoneVerified);
		if (this.props.user.phoneVerified === false) {
			Alert({
				message: 'Your new contact number is not verified',
				buttons: [
					{
						title: 'Verify',
						icon: false,
						backgroundColor: 'blue',
						onPress: this.goToOtp
					}
				]
			});
		}
	};
	componentDidMount() {
		this.state.userName = this.props.user.fullname;
		this.state.email = this.props.user.email;
		this.state.contactNo = this.props.user.contactNo;
		this.state.picture = this.props.user.picture;
		this.state.emergencyContactNo = this.props.user.emergencycontactnumber;
		// this.state.DUN = this.props.driver.driverUniqueNo;
		// this.state.vehicleNo = this.props.driver.vehicleNo;
		this.setState({});
		this.checkPhoneVerified();
		setTimeout(() => {
			SplashScreen.hide();
		}, 2000);
	}

	onSave = () => {
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		if (this.state.contactNo !== this.props.user.contactNo) {
			let data = {
				phoneVerified: false,
				picture: this.state.picture,
				fullname: this.state.userName,
				newContactNo: this.state.contactNo
			};
			this.setState({ loading: true });
			callApi('post', 'v1/daffo/dispatch/updateDriver', data, headers)
				// Axios.patch('http://192.168.100.141:3000/v1/daffo/User/updateOwn', data, { headers })
				.then((result) => {
					this.setState({ loading: false });
					console.log(
						'result>>>>>>>>>>>>>>>>>>>>>>:::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>>',
						result.data.updatedUser
					);
					setUser(result.data.updatedUser);
					// setDriver(result.data.updatedDriver);
					// this.setState({ loading: false });
					this.props.navigation.navigate('OTP', { contactNo: this.state.contactNo });
				})
				.catch((err) => {
					console.log('error from myProfile Base ', err.response, err.status, err);
					// this.setState({ loading: false });
				});
		} else {
			console.warn('My profile being called');
			this.setState({ loading: true });
			let data = {
				// contactNo: this.state.contactNo,
				picture: this.state.picture,
				fullname: this.state.userName
			};
			callApi('post', 'v1/daffo/dispatch/updateDriver', data, headers)
				.then((result) => {
					this.setState({ loading: false });
					console.log(
						'result>>>>>>>>>>>>>>>>>>>>>>:::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>>',
						result.data.updatedUser
					);
					setUser(result.data.updatedUser);
					// setDriver(result.data.updatedDriver);
					// this.setState({ loading: false });
				})
				.catch((err) => {
					console.log('error from myProfile Base ', err.response, err.status, err);
					// this.setState({ loading: false });
				});
		}
	};
	cameraClicked = () => {
		console.log('avatarrrrrrrrrrrrrrr clicked called>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		const options = {
			title: 'Select Avatar'
		};
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				let data = new FormData();
				// const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };
				ImageResizer.createResizedImage(response.uri, 164, 164, 'JPEG', 100, 0).then((result) => {
					data.append('file', {
						uri: result.uri,
						type: 'image/jpeg',
						name: result.name
					});
					data.append('bucket', 'public');
					let headers = {
						'Content-Type': 'multipart/form-data',
						Accept: 'application/json',
						authorization: `Bearer ${this.props.token}`
					};
					console.log('Tokennnnnnnnnnnnnnnnnnnnnnnnnnnnn', this.props.token);
					callApi('post', 'v1/daffo/dispatch/upload', data, headers)
						// Axios.post('http://192.168.100.141:3000/v1/daffo/dispatch/upload', data, { headers })
						.then((result1) => {
							console.log('updateddddddddddddddddddd', result1);
							this.setState({ picture: result1.data[0].file.filename });
						})
						.catch((err) => {
							console.log('error from myProfile Base upload image', err.response, err.status, err);
							// this.setState({ loading: false });
						});
				});
			}
		});
	};

	GeneralInfoPressed = () => {
		this.setState({ GeneralInfoPressed: true, AdditionalInfoPressed: false });
	};
	AdditionalInfoPressed = () => {
		this.setState({ GeneralInfoPressed: false, AdditionalInfoPressed: true });
	};
}
