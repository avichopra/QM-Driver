import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { callApi } from '../utilities/serverApi';
import SplashScreen from 'react-native-splash-screen';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
export default class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			GeneralInfoPressed: false,
			AdditionalInfoPressed: false,
			GeneralInfo: {
				email: '',
				contactNo: '',
				emergencyContactNo: '',
				emailError: '',
				contactNoError: '',
				emergencyContactNoError: ''
			},
			AdditionalInfo: {
				address: '',
				bloodGroup: '',
				emergencyContactNo: '',
				relationWithPatient: '',
				addressError: '',
				bloodGroupError: '',
				relationWithPatientError: ''
			},
			imageSelected: false,
			profileImage: '',
			userName: '',
			avatarSource: null,
			picture: ''
		};
	}
	onHandleChange = (name, value, field) => {
		this.state[field][name] = value;
		this.setState({});
		console.log('stateeeeeeeeeeeeeeeeee', this.state[field]);
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	componentDidMount() {
		setTimeout(() => {
			SplashScreen.hide();
		}, 2000);
	}

	onSave = () => {
		console.log('onSave being called>>>>>>>>>>>>>>>>>>>>>>>');
		let data = new FormData();
		// data.append('email', this.state.GeneralInfo.email);
		// data.append('contactNo', this.state.GeneralInfo.contactNo);
		// data.append('emergencycontactnumber', this.state.GeneralInfo.emergencyContactNo);
		// data.append('bloodGroup', this.state.AdditionalInfo.bloodGroup);
		// data.append('realtionWithPatient', this.state.AdditionalInfo.relationWithPatient);
		// data.append('emergencyContactNo', this.state.AdditionalInfo.emergencyContactNo);
		// if (this.state.imageSelected === true) {
		data.append('file', {
			uri: this.state.avatarSource.uri,
			type: 'image/jpeg',
			name: this.state.avatarSource.fileName
		});
		data.append('bucket', 'public');

		// }
		let headers = {
			'Content-Type': 'multipart/form-data',
			Accept: 'application/json',
			authorization:
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDgwNDk1MDMsImlhdCI6MTU0ODA0NzcwMywic3ViIjoiNWM0MzAwODRkNmVhMTgzZDYyNTMwMzc4In0.1fIiDfuod_ggf21IrtmuMA6f1_m0UQAZXXqMoZnkMnc'
		};
		console.log('callinnnnnnnnnnnnnnnnnnnnng api', data);
		callApi('post', 'v1/daffo/dispatch/upload', data, headers)
			// Axios.post('http://192.168.100.141:3000/v1/daffo/dispatch/upload', data, { headers })
			.then((response) => {
				console.log('recieved response from uploaddddddddd', response.data[0].file.filename);
				this.setState({ picture: response.data[0].file.filename });
			})
			.catch((err) => {
				console.log('error from myProfile Base upload image', err.response, err.status, err);
				// this.setState({ loading: false });
			});
	};
	cameraClicked = () => {
		console.log('avatarrrrrrrrrrrrrrr clicked called>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		const options = {
			title: 'Select Avatar'
			// customButtons: [ { name: 'fb', title: 'Choose Photo from Facebook' } ],
			// storageOptions: {
			// 	skipBackup: true,
			// 	path: 'images'
			// }
		};
		ImagePicker.launchImageLibrary(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				// const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };

				this.setState({
					avatarSource: response,
					imageSelected: true
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
