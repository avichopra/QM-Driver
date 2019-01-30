import React, { Component } from 'react';
import { Text, View, Keyboard } from 'react-native';
import Axios from 'axios';
import { callApi } from '../utilities/serverApi';
import { checkEmpty } from '../utilities/validation';
import { Alert } from '../../src/ReusableComponents/modal';
const emptyState = {
	historyList: [],
	page: 1
};
export default class History extends Component {
	constructor(props) {
		super(props);
		this.state = emptyState;
	}
	onEndReached = () => {
		console.log('OnEndReached');
		let data = {
			perPage: 2,
			page: this.state.page,
			fields: {
				driverId: { vehicleNo: 1, userId: { picture: 1, fullname: 1 } },
				patientAddress: 1,
				driverAddress: 1
			}
		};
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		callApi('post', 'v1/daffo/Trips/get', data, headers)
			.then((response) => {
				this.setState({ historyList: this.state.historyList.concat(response.data), page: this.state.page + 1 });
				console.log('response from On end reached', response.data);
			})
			.catch((err) => {
				console.log('error from history get route>>>>>>>>>>>>>>>>>>>>>', err);
			});
	};
	componentDidMount() {
		console.log('history        >>>>>>>>>>>>>>');
		let data = {
			perPage: 2,
			page: this.state.page,
			fields: {
				driverId: { vehicleNo: 1, userId: { picture: 1, fullname: 1 } },
				patientAddress: 1,
				driverAddress: 1
			}
		};
		let headers = {
			'Content-Typpe': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		callApi('post', 'v1/daffo/Trips/get', data, headers)
			.then((response) => {
				this.setState({ historyList: response.data, page: this.state.page + 1 });
				console.log('response from historyyyyy', response.data);
			})
			.catch((err) => {
				console.log('error from history get route>>>>>>>>>>>>>>>>>>>>>', err);
			});
	}
}
