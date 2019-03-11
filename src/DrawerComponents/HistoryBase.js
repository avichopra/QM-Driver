import React, { Component } from 'react';
import { Text, View, Keyboard } from 'react-native';
import Axios from 'axios';
import { callApi } from '../utilities/serverApi';
import { checkEmpty } from '../utilities/validation';
import { Alert } from '../../src/ReusableComponents/modal';
const emptyState = {
	historyList: [],
	page: 1,
	perPage: 5,
	loading:true
};
let page=1;
export default class History extends Component {
	constructor(props) {
		super(props);
		this.state = emptyState;
	}
	onEndReached = () => {
		console.warn('OnEndReached', this.state.page);
		let data = {
			perPage: (this.state.count-this.state.historyList.length)<=5?this.state.count-this.state.historyList.length:5,
			page: this.state.page,
			fields: {
				patientId: { userId: { picture: 1, fullname: 1 } },
				patientAddress: 1,
				driverAddress: 1,
				updatedAt:1
			},
			filter:{
				status:"Complete",
				driverId:this.props.driver._id
			}
		};
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let a=(this.state.count-this.state.historyList.length)<=5?this.state.count-this.state.historyList.length:5
		console.warn("Length",a,"Perpage value",data.perPage)
		if((this.state.count-this.state.historyList.length)!=0)
		{
				let b=(this.state.count-this.state.historyList.length)!=0
				console.warn("inside if>>>>>",b)
		callApi('post', 'v1/daffo/Trips/getOwn', data, headers)
			.then((response) => {
				console.log("History response",response)
					this.setState({
						historyList: this.state.historyList.concat(response.data),
						page: this.state.page + 1,
						loading:false
					});
			})
			.catch((err) => {
				console.log('error from history get route>>>>>>>>>>>>>>>>>>>>>', err);
			});
		}
	};
	componentDidMount() {
		console.log('history >>>>>>>>>>>>>>>>>>>>>>>>>>>>       >>>>>>>>>>>>>>', this.props.driver._id);
		let data = {
			page:this.state.page,
			perPage: 5,
			filter: { status:"Complete",driverId: this.props.driver._id },
			fields: {
				patientId: { userId: { picture: 1, fullname: 1 } },
				patientAddress: 1,
				updatedAt:1,
				driverAddress: 1,
			}
		};
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		callApi('post', 'v1/daffo/Trips/count', data, headers)
			.then((result) => {
				console.log('count>>>>>>>>>>>>>>>>>>>>>>>>>>', result.data.count);
				this.setState({ count: result.data.count });
				callApi('post', 'v1/daffo/Trips/getOwn', data, headers)
					.then((response) => {
						console.log("response>>>>>>>>>>>>>>",response)
						this.setState({loading:false,historyList: response.data, page: this.state.page + 1 });
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
