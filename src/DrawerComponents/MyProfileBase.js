import React, { Component } from 'react';
import { Text, View, Keyboard } from 'react-native';
import { callApi } from '../utilities/serverApi';
import ImageResizer from 'react-native-image-resizer';

import SplashScreen from 'react-native-splash-screen';
import ImagePicker from 'react-native-image-picker';
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
import { setUser, setDriver } from '../redux/index';
=======
import { setUser, setPatient } from '../redux/index';
>>>>>>>  changes app icon login rest

import Axios from 'axios';
export default class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
			email: '',
			contactNo: '',
			// vehicleNo: '',
			// DUN: '',
=======
			GeneralInfoPressed: true,
			AdditionalInfoPressed: false,
			GeneralInfo: {
				email: '',
				contactNo: '',
				emergencyContactNo: '',
				contactNoError: '',
				emergencyContactNoError: ''
			},
			AdditionalInfo: {
				address: '',
				bloodGroup: '',
				emergencyContactNo: '',
				relationWithPatient: ''
			},
>>>>>>>  changes app icon login rest
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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
			this.state[field] = value;
=======
			this.state[field][name] = value;
>>>>>>>  changes app icon login rest
			this.setState({});
		} else {
			this.state[name] = value;
			this.setState({});
		}
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
		console.log('this.state>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.state);
=======
>>>>>>>  changes app icon login rest
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};

	
	componentDidMount() {
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
		this.state.userName = this.props.user.fullname;
		this.state.email = this.props.user.email;
		this.state.contactNo = this.props.user.contactNo;
		this.state.picture = this.props.user.picture;
		this.state.emergencyContactNo = this.props.user.emergencycontactnumber;
		// this.state.DUN = this.props.driver.driverUniqueNo;
		// this.state.vehicleNo = this.props.driver.vehicleNo;
		this.setState({});
=======
		console.warn(this.props.patient);
		this.state.userName = this.props.user.fullname;
		this.state.GeneralInfo.email = this.props.user.email;
		this.state.GeneralInfo.contactNo = this.props.user.contactNo;
		this.state.picture = this.props.user.picture;
		this.state.AdditionalInfo.bloodGroup = this.props.patient.bloodGroup;
		this.state.AdditionalInfo.relationWithPatient = this.props.patient.realtionWithPatient;
		this.state.AdditionalInfo.address = this.props.patient.address;
		this.state.GeneralInfo.emergencyContactNo = this.props.user.emergencycontactnumber;
		this.state.AdditionalInfo.emergencyContactNo = this.props.patient.emergencyContactNo;
		this.setState({});
		// console.log('did mount>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.props.user.);
>>>>>>>  changes app icon login rest
		setTimeout(() => {
			SplashScreen.hide();
		}, 2000);
	}

	onSave = () => {
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
		let data = {
			// contactNo: this.state.contactNo,
			picture: this.state.picture,
			fullname: this.state.userName
			// vehicleNo: this.state.vehicleNo,
			// driverUniqueNo: this.state.DUN
		};
=======
		Keyboard.dismiss();
		// console.log('on save being called>>>>>>>>>>>>>>>>>>>>>>>>>>.');
		// let contactNoError, emergencyContactNoError;
		// if (
		// 	this.state.GeneralInfo.contactNo !== '' &&
		// 	(this.state.GeneralInfo.contactNo.length < 10 || this.state.GeneralInfo.contactNo.length > 10)
		// ) {
		// 	contactNoError = true;
		// 	this.state.GeneralInfo.contactNoError = 'field should be 10 characters long';
		// 	this.setState({});
		// } else {
		// 	contactNoError = false;
		// }
		// if (
		// 	this.state.GeneralInfo.emergencyContactNo !== '' &&
		// 	(this.state.GeneralInfo.emergencyContactNo.length < 10 || this.state.GeneralInfo.emergencyContactNo > 10)
		// ) {
		// 	emergencyContactNoError = true;
		// 	this.state.GeneralInfo.emergencyContactNoError = 'field should be 10 characters long';
		// 	this.setState({});
		// } else {
		// 	emergencyContactNoError = false;
		// }
		// if (emergencyContactNoError && contactNoError === false) {
		let data = {
			username: this.state.userName,
			email: this.state.GeneralInfo.email,
			contactNo: this.state.GeneralInfo.contactNo,
			emergencycontactnumber: this.state.GeneralInfo.emergencyContactNo,
			address: this.state.AdditionalInfo.address,
			bloodGroup: this.state.AdditionalInfo.bloodGroup,
			realtionWithPatient: this.state.AdditionalInfo.relationWithPatient,
			emergencyContactNo: this.state.AdditionalInfo.emergencyContactNo,
			picture: this.state.picture
		};
		console.warn("token before save",this.props.token)
>>>>>>>  changes app icon login rest
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		this.setState({ loading: true });
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
		// callApi('patch', 'v1/daffo/User/updateOwn', data, headers)
		// 	// Axios.patch('http://192.168.100.141:3000/v1/daffo/User/updateOwn', data, { headers })
		// 	.then((result) => {
		// 		console.log('result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', result);
		// 		setUser(result.data[0]);
		// 	})
		// 	.catch((err) => {
		// 		console.log('error from myProfile Base update', err.response, err.status, err);
		// 	});
		// let data1 = {
		// 	vehicleNo: this.state.vehicleNo,
		// 	driverUniqueNo: this.state.driverUniqueNo
		// };

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
=======
		callApi('post', 'v1/daffo/dispatch/updatePatient', data, headers)
			// Axios.patch('http://192.168.100.141:3000/v1/daffo/User/updateOwn', data, { headers })
			.then((result) => {
				console.log('useeeeeeeeeeeeeeeeeeeeeeeeee', result);
				this.setState({ loading: false });
				setUser(result.data.updatedUser);
				setPatient(result.data.updatedPatient);
			})
			.catch((err) => {
				console.warn('error from myProfile Base ', err.response, err.status, err);
>>>>>>>  changes app icon login rest
			});
		// }
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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
							console.log('updateddddddddddddddddddd', result1);
=======
							console.warn('updateddddddddddddddddddd', result1);
>>>>>>>  changes app icon login rest
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
