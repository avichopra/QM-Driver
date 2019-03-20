import _ from 'lodash';
import { Component } from 'react';
import axios from "axios";
import PolyLine from '@mapbox/polyline';
import RNGooglePlaces from 'react-native-google-places';
import { AnimatedRegion } from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import call from 'react-native-phone-call';
import { setDriver } from '../redux';
import {unSubscribeSockets,saveSubscriptionInfo} from "../utilities/socket"
import GPSState from 'react-native-gps-state'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { addLocation ,cancelPatientLocationCoord,saveTrip,addPatientLocationCoord,addHospitalLocationCoord,cancelTrip} from '../redux/actions/index';
import Store from '../redux/store/index';
import { callApi } from '../utilities/serverApi';
let latitude_delta=0.009,longitude_delta=0.009;
export default class HomeBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0,
			longitudeDelta: 0,
			currentPlace: '',
			loading: true,
			accept: false,
			reject: false,
			showAcceptDecline: false,
			showReasons: false,
			coordinate: new AnimatedRegion({
				latitude: 29.1397982,
				longitude: 75.75666079999999
			}),
			destination: new AnimatedRegion({
				latitude: 29.1397982,
				longitude: 75.75666079999999
			})
		};
	
	}
	Call = (Type) => {
		console.log("type",Type)
		const args = {
			number: Type === 'CN' ? this.props.trip.hospitalNo : Type,
			prompt: false 
		};
		call(args).catch(console.error);
	};
	onShowReasons = (value) => {
		this.setState({ showReasons: value });
	};
	markComplete=()=>{
		console.warn("Completed")
		Store.dispatch(cancelTrip());
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let data = {
			driverData: this.props.trip.driverId.userId._id,
			patientData:this.props.trip.patientId.userId._id
		};
		callApi('post', 'v1/daffo/dispatch/tripCompleted', data, headers)
			.then((response) => {
				console.log('response', response);
			})
			.catch((err) => {
				console.log('error from home base', err);
			});
	}
	navigationMap=async()=>{
	  console.log("Navigation map data",this.props.trip)
		let data;
		 this.props.trip.pickedPatient?
		 data = {
			source: {
			 latitude: parseFloat(this.props.trip.patientLocation.lat) ,
			 longitude: parseFloat(this.props.trip.patientLocation.long)
		   },
		   destination: {
			 latitude:  parseFloat(this.props.trip.hospitalLocation.lat),
			 longitude: parseFloat(this.props.trip.hospitalLocation.long)
		   },
		   params: [
			 {
			   key: "travelmode",
			   value: "driving"     
			 }
		   ]
		 }
:  data = { source: {
	latitude: this.state.latitude ,
	longitude: this.state.longitude
  },
  destination: {
	latitude: parseFloat(this.props.trip.patientLocation.lat),
	longitude: parseFloat(this.props.trip.patientLocation.long)
  },
  params: [
	{
	  key: "travelmode",
	  value: "driving"     
	}
  ]}
  console.log("data before navigation",data)
		 getDirections(data)
	}

	 componentWillReceiveProps(nextProps)
	{
		if(nextProps.trip!=null)
		{console.log("Inside component receive props",nextProps)
		   if(nextProps.pickedLocationCoord===null)
		   { 
			if(nextProps.trip.pickedPatient===false)
			 this.getPickupRouteDirection(nextProps.trip.patientLocation)
		   }
		   if(nextProps.hospitalLocationCoord===null)
		   {
		     this.getHospitalRouteDirection(nextProps.trip)
		   }
		}
		if(this.props.gpsData!=nextProps.gpsData)
		{
			this.desmarker._component.animateMarkerToCoordinate(
				{
				latitude: parseFloat(nextProps.gpsData.latitude),
				longitude: parseFloat(nextProps.gpsData.longitude)
				},
				2000
				);
				let newCoordinate={latitude:parseFloat(nextProps.gpsData.latitude),longitude:parseFloat(nextProps.gpsData.longitude),latitudeDelta:latitude_delta,longitudeDelta:longitude_delta}
				this.map.animateToRegion(newCoordinate, 1000);
		}
		}
	     getPickupRouteDirection=async (patientLocation)=>{
			let method="get",url=`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=${patientLocation.lat},${patientLocation.long}&key=AIzaSyAYl-EN9gKgW4DflxwhYmHIt4RqP5vT-WY`,
			headers={'content-type': 'application/json'}
			let option={
			method,
			url,
			headers}
			axios(option).then(response=>{ 
				const points = PolyLine.decode(response.data.routes[0].overview_polyline.points);
				let pointCoords = points.map((point) => {
					return { latitude: point[0], longitude: point[1] };
				});
			    Store.dispatch(addPatientLocationCoord(pointCoords,{distance:response.data.routes[0].legs[0].distance.text,duration:response.data.routes[0].legs[0].duration.text}))
				if(this.props.trip===null)
				this.map.fitToCoordinates(pointCoords);
				console.log("Point Coords",pointCoords)
			})
				}
	      getHospitalRouteDirection=async (data)=>{
			let method="get",url=`https://maps.googleapis.com/maps/api/directions/json?origin=${data.patientLocation.lat},${data.patientLocation.long}&destination=${data.hospitalLocation.lat},${data.hospitalLocation.long}&key=AIzaSyAYl-EN9gKgW4DflxwhYmHIt4RqP5vT-WY`,
				headers={'content-type': 'application/json'}
				let option={
				method,
				url,
				headers}
				axios(option).then(response=>{
					const points = PolyLine.decode(response.data.routes[0].overview_polyline.points);
					let pointCoords = points.map((point) => {
						return { latitude: point[0], longitude: point[1] };
					});
					Store.dispatch(addHospitalLocationCoord(pointCoords,{distance:response.data.routes[0].legs[0].distance.text,duration:response.data.routes[0].legs[0].duration.text}))
				})
				}
	onAccept = async() => {
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let { currentPlace = '', latitude = '', longitude = '' } = this.state;
		let {  user = {},patientTempData={}} = this.props;
		await unSubscribeSockets("Trip");
		await saveSubscriptionInfo("TripInProgress",[])
		this.setState({ accept: true, reject: false });
		console.warn("user data on Accept",user.id)
		let data = {
			patient: {RequestData:patientTempData.patient.RequestData,patientId:patientTempData.patient.userId,patientLocation:{currentPlace:patientTempData.location.currentPlace,latitude:patientTempData.location.latitude,longitude:patientTempData.location.longitude}},
			driver:{deviceId:user.deviceId,driverId:user.id,driverLocation:{currentPlace:currentPlace,latitude:latitude,longitude:longitude}},
				};
		callApi('post', 'v1/daffo/dispatch/ambulanceRequestAccepted', data, headers)
			.then((response) => {
				Store.dispatch(saveTrip(response.data.trip))
				unSubscribeSockets("TripInProgress")
				console.log('response', response);
			})
			.catch((err) => {
				console.log('error from home base', err);
			});
	};
	onReject = () => {
		this.setState({ showReasons: true });
	};
	onSubmit = async(value) => {
		this.setState({ showReasons: false });
		Store.dispatch(cancelTrip())
		await unSubscribeSockets("Trip");
	};
onClickPickPatient=async()=>
{
	let headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		authorization: `Bearer ${this.props.token}`
	};
	let data = {
		driverData: this.props.trip.driverId,
		patientData:this.props.trip.patientId
	};
	await Store.dispatch(cancelPatientLocationCoord())
	callApi('post', 'v1/daffo/dispatch/pickedUpPatient', data, headers)
			.then((response) => {
				console.log('response', response);
				Store.dispatch(saveTrip(response.data.trip))
			})
			.catch((err) => {
				console.log('error from home base', err);
			});
}
	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
		GPSState.removeListener()
	}
	openDrawer = () => {
		console.log('open drawer being called>>>>>>>>>>>>>>>>>>>>');
		this.props.navigation.openDrawer();
	};
	componentWillMount() {
		console.warn('Location in redux', this.props.location);
		if(this.props.showAcceptDecline===false && this.props.patient!=null)
		    this.setState({destination:{latitude:this.props.patientLocation.latitude,longitude:this.props.patientLocation.longitude}})
		if (this.props.location != null) {
			this.setState({
				loading: false,
				latitude: this.props.location.latitude,
				longitude: this.props.location.longitude
			});
		}
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let data={perPage:1,fields:{ambulanceId:{vehicleNo:1}},filter:{driverId:this.props.user.id}}
		console.warn('token', this.props.token);
		Promise.all([callApi('post', 'v1/daffo/AssignAmbulance/getOwn', data, headers),callApi('post', 'v1/daffo/Driver/getOwn', { perPage: 1, filter: { userId: this.props.user.id } }, headers)])
			.then((result) => {
				console.log("results=========>>>>>>>>>>>>>",result)
				 setDriver({...result[1].data[0],ambulanceDetails:result[0].data[0].ambulanceId});
			})
			.catch((err) => {
				console.log('errorrrrrrr>>>>>>>>>', err);
			});
	}
	checkLocationIsEnabled=()=>{
		RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
		.then(data => {
					RNGooglePlaces.getCurrentPlace()
				.then((results) => {
					Store.dispatch(addLocation({ latitude: results[0].latitude, longitude: results[0].longitude }));
					this.setState({
						loading: false,
						currentPlace: `${results[0].name},${results[0].address}`,
						latitude: results[0].latitude,
						longitude: results[0].longitude
					});
					console.warn('current place', results);
				})
				.catch((error) => console.warn(error.message));
		})
	}
	componentDidMount() {
		this.checkLocationIsEnabled()
		GPSState.addListener((status)=>{
	console.warn("location state",status)
		 if(status===1)
		 {
		this.checkLocationIsEnabled()
		 }
		})
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				console.warn('location changed');
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			},
			function(error) {
				console.warn(error);
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}
	setUserLocation = (Coordinate) => {
		const { latitude, longitude } = Coordinate;
		const newCoordinate = {
			latitude,
			longitude,
			latitudeDelta:latitude_delta,
			longitudeDelta:longitude_delta
		};
	if(this.props.trip===null && this.props.pickedLocationCoord===null)
	{
		const newCoordinate = {
			latitude,
			longitude,
			latitudeDelta:latitude_delta,
			longitudeDelta:longitude_delta
		};
		this.map.animateToRegion(newCoordinate, 1000);
	}
};
	onRegionChangeComplete = (region) => {
		latitude_delta = region.latitudeDelta;
		longitude_delta = region.longitudeDelta;
	};
	AutoCom = () => {
		RNGooglePlaces.openAutocompleteModal({ country: 'IN', radius: 100 })
			.then((place) => {
				this.setState({
					currentPlace: place.address,
					latitude: place.latitude,
					longitude: place.longitude
				});
				console.log(place.latitude);
			})
			.catch((error) => console.log(error.message));
	};
}
