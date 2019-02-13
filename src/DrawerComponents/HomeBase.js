import _ from 'lodash';
import { Component } from 'react';
import { Dimensions, PermissionsAndroid } from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import RNGooglePlaces from 'react-native-google-places';
import { AnimatedRegion } from 'react-native-maps';
import call from 'react-native-phone-call';
import { setDriver } from '../redux';
import { addLocation } from '../redux/actions/index';
import { setPatient } from '../redux/index';
import Store from '../redux/store/index';
import { callApi } from '../utilities/serverApi';
const { width, height } = Dimensions.get('window');

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
			patient: null,
			showAcceptDecline: false,
			showReasons: false,
			coordinate: new AnimatedRegion({
				latitude: 29.95539,
				longitude: 78.07513
			}),
			destination: new AnimatedRegion({
				latitude: 29.1397982,
				longitude: 75.75666079999999
			}),
			showdes: false,
			pointCoords: []
		};
		// this.requestLocationPermission();
	}
	Call = (Type) => {
		const args = {
			number: Type === 'CN' ? this.props.patient.contactNo : this.props.patient.emergencyContactNo, // String value with the number to call
			prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
		};
		call(args).catch(console.error);
	};
	onShowReasons = (value) => {
		this.setState({ showReasons: value });
	};
	onAccept = () => {
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let { currentPlace = '', latitude = '', longitude = '' } = this.state;
		let { patient = {}, driver = {}, allDrivers = [], location = {}, user = {},patientLocation } = this.props;
		console.warn('patient?>>>>>>>>>>>>>>>>>>>>', allDrivers,patientLocation);
         this.setState({showdes:true,destination:{latitude:patientLocation.latitude,longitude:patientLocation.longitude}})
		_.remove(allDrivers, (item) => item === this.props.user.id);
		setPatient(false);
		this.setState({ accept: true, reject: false });
		let data = {
			userId: patient.userId,
			patientId: patient.patientId,

			allDrivers: allDrivers,
			driver: { ...driver, ...user },
			location: { currentPlace: currentPlace, latitude: latitude, longitude: longitude }
		};
		callApi('post', 'v1/daffo/dispatch/requestAmbulance', data, headers)
			.then((response) => {
				console.log('response', response);
			})
			.catch((err) => {
				console.log('error from home base', err);
			});
	};
	onReject = () => {
		this.setState({ showReasons: true });
	};
	onSubmit = (value) => {
		allDrivers = this.props.allDrivers;
		_.remove(allDrivers, (item) => item === this.props.user.id);
		console.warn('all driversssssssssssssssssssssssssssssssss', allDrivers);
		console.warn(this.props.allDrivers);
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let data = {
			trip: {
				cancellationMessage: value,
				patientId: this.props.patient.patientId,
				driverId: this.props.driver._id,
				cancelledBy: this.props.user.id
			},
			allDrivers: allDrivers
		};
		this.setState({ showReasons: false });
		setPatient(false, {});
		callApi('post', 'v1/daffo/dispatch/requestAmbulance', data, headers)
			.then((response) => {
				console.log('response', response);
			})
			.catch((err) => {
				console.log('error from >>>>>>>>>>>>>>>>>>>>>', err);
			});
	};

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}
	openDrawer = () => {
		console.log('open drawer being called>>>>>>>>>>>>>>>>>>>>');
		this.props.navigation.openDrawer();
	};
	componentWillMount() {
		// this.requestLocationPermission();
		console.warn('Location in redux', this.props.location);
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
		console.warn('token', this.props.token);
		callApi('post', 'v1/daffo/Driver/getOwn', { perPage: 1, filter: { userId: this.props.user.id } }, headers)
			.then((result) => {
				console.log("results=========",result)
				result.data[0] ? setDriver(result.data[0]) : '';
			})
			.catch((err) => {
				console.log('errorrrrrrr>>>>>>>>>', err);
			});
	}
	componentDidMount() {
		LocationServicesDialogBox.checkLocationServicesIsEnabled({
			message:
				'<h3>Use Location?</h3> \
						This app wants to change your device settings:<br/><br/>\
						Use GPS for location<br/><br/>',
			ok: 'YES',
			cancel: 'NO'
		}).then(() => {
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
		});
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				console.warn('location changed');
				// Create the object to update this.state.mapRegion through the onRegionChange function
		
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
				// this.onRegionChange(region, region.latitude, region.longitude);
				// this._map.animateToRegion(region, 100);
			},
			function(error) {
				console.warn(error);
			}
		);
	}
	setUserLocation = (Coordinate) => {
		//   console.warn("location changed",Coordinate)
		const { latitude, longitude } = Coordinate;
		const newCoordinate = {
			latitude,
			longitude
		};
		if (this.marker) {
			this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
		}
		//    this.map.fitToCoordinates(this.state.pointCoords)
		// this.getRouteDirection()

		//   this.map.animateToRegion({latitude:Coordinate.latitude,longitude:Coordinate.longitude,latitudeDelta:latitude_delta,longitudeDelta:longitude_delta}, 2000)
		// // this.setState({
		// 			routeCoordinates: this.state.routeCoordinates.concat([newCoordinate])
		// 		});
	};
	onRegionChangeComplete = (region) => {
		latitude_delta = region.latitudeDelta;
		longitude_delta = region.longitudeDelta;
		//  console.warn("Completed region",region)
		//  this.setState({latitudeDelta:region.latitudeDelta,longitudeDelta:region.longitudeDelta})
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
