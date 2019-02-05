import React, { Component } from 'react';
import { Text, View, Keyboard } from 'react-native';
import Axios from 'axios';
import { callApi } from '../utilities/serverApi';
import { checkEmpty } from '../utilities/validation';
import { Alert } from '../../src/ReusableComponents/modal';
const emptyState = {
	historyList: [],
	page: 1,
	perPage: 5
};
export default class History extends Component {
	constructor(props) {
		super(props);
		this.state = emptyState;
	}
	onEndReached = () => {
		console.warn('OnEndReached', this.state.page);
		let data = {
			perPage: this.state.perPage,
			page: this.state.page,
			// filter: { driverId: this.props.user.id },
			fields: {
				patientId: { userId: { picture: 1, fullname: 1 } },
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
				if (this.state.count > this.state.page * this.state.perPage) {
					this.setState({
						historyList: this.state.historyList.concat(response.data),
						page: this.state.page + 1
					});
				}
			})
			.catch((err) => {
				console.log('error from history get route>>>>>>>>>>>>>>>>>>>>>', err);
			});
	};
	componentDidMount() {
		console.log('history >>>>>>>>>>>>>>>>>>>>>>>>>>>>       >>>>>>>>>>>>>>', this.props.driver._id);
		let data = {
			perPage: this.state.perPage,
			page: this.state.page,
			filter: { driverId: this.props.driver._id },
			fields: {
				patientId: { userId: { picture: 1, fullname: 1 } },
				patientAddress: 1,
				driverAddress: 1
			}
		};
		let headers = {
			'Content-Typpe': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};

		callApi('post', 'v1/daffo/Trips/count', data, headers)
			.then((result) => {
				console.log('count>>>>>>>>>>>>>>>>>>>>>>>>>>', result.data.count);
				this.setState({ count: result.data.count });
				callApi('post', 'v1/daffo/Trips/get', data, headers)
					.then((response) => {
						this.setState({ historyList: response.data, page: this.state.page + 1 });
						console.log('response from historyyyyy', response.data);
					})
					.catch((err) => {
						console.log('error from history get route>>>>>>>>>>>>>>>>>>>>>', err);
					});
			})
			.catch((err) => {
				console.log('error from myProfile Base', err.response, err.status, err);
			});
	}
}
