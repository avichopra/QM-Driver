// import React, { Component } from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import Header from './Header';
// import Icon from 'react-native-vector-icons/Foundation';
// import SplashScreen from 'react-native-splash-screen';

// class Home extends Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	static navigationOptions = {
// 		drawerLabel: 'Home',
// 		drawerIcon: ({ tintColor }) => (
// 			// <Image source={require('./chats-icon.png')} style={[ styles.icon, { tintColor: tintColor } ]} />
// 			<Icon name={'home'} size={25} color={'black'} />
// 		)
// 	};

// 	componentDidMount() {
// 		setTimeout(() => {
// 			SplashScreen.hide();
// 		}, 2000);
// 	}

// 	render() {
// 		return (
// 			// <View>
// 			<Header title={'Quick Medic'} openDrawer={this.openDrawer} />
// 			/* <TouchableOpacity onPress={this.openDrawer}>
// 					<Text>Home</Text>
// 				</TouchableOpacity> */
// 			// </View>
// 		);
// 	}
// }
// export default Home;
import React, { Component } from 'react';
import Header from './Header';

import {
	Platform,
	StyleSheet,
	PermissionsAndroid,
	Text,
	View,
	Dimensions,
	TextInput,
	Image,
	Button,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { callApi } from '../utilities/serverApi';
import { setDriver } from '../redux';

const { width, height } = Dimensions.get('window');
class Home extends Component {
	constructor() {
		super();
		this.state = {
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0,
			longitudeDelta: 0,
			currentPlace: ''
		};
	}
	componentWillUnmount() {
		navigator.geolocation.clearWatch();
	}
	openDrawer = () => {
		console.log('open drawer being called>>>>>>>>>>>>>>>>>>>>');
		this.props.navigation.openDrawer();
	};
	componentWillMount() {
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		console.warn('token', this.props.token);
		callApi(
			'post',
			'v1/daffo/Driver/getOwn',
			{ perPage: 1, filter: { userId: this.props.user.id } },
			headers
		).then((result) => {
			console.warn('resultttttttttttttttttttttttttttttt getOwn', result.data[0]);
			result.data[0] ? setDriver(result.data[0]) : '';
		});
	}
	componentDidMount() {
		RNGooglePlaces.getCurrentPlace()
			.then((results) =>
				this.setState({
					currentPlace: `${results[0].name},${results[0].address}`
				})
			)
			.catch((error) => console.log(error.message));
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				// Create the object to update this.state.mapRegion through the onRegionChange function
				let region = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.5,
					longitudeDelta: 0.5 * (width / height)
				};
				console.warn('Region', region);
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
				// this.onRegionChange(region, region.latitude, region.longitude);
				// this._map.animateToRegion(region, 100);
			},
			function(error) {
				console.log(error);
			}
		);
		this.getDirection('29.132963299999993,75.7534505', '29.1328949,75.753995');
		this._askForLocationServices();
	}
	getDirection = async (startLoc, destinationLoc) => {
		let resp = await fetch(
			`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyASICVTRwAiAnnT_AzZFCqitJ56C8koh3s`
		);
		let respJson = await resp.json();
		// let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
		console.log(respJson);
		// let coords = points.map((point, index) => {
		//   return {
		//     latitude: point[0],
		//     longitude: point[1]
		//   };
		// });
		console.log(respJson);
	};
	_askForLocationServices() {
		PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			title: 'question',
			message: 'gimme that location'
		}).then((granted) => {
			console.log('granted', granted);
			// always returns never_ask_again
		});
	}
	onRegionChange(region) {
		// this.setState({
		//   latitude: region.latitude,
		//   longitude: region.longitude,
		//   latitudeDelta: region.latitudeDelta,
		//   longitudeDelta: region.longitudeDelta
		// });
		// console.warn("region changed", region);
	}
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
	render() {
		console.log('Current position', this.state.latitude, this.state.longitude);
		return (
			<View style={styles.container}>
				<Header title={'Quick Medic'} openDrawer={this.openDrawer} />

				<MapView
					provider={PROVIDER_GOOGLE}
					style={[ styles.map ]}
					showsUserLocation={true}
					mapType="standard"
					followsUserLocation={true}
					showsBuildings={true}
					showsTraffic={true}
					showsMyLocationButton={true}
					region={{
						latitude: this.state.latitude,
						longitude: this.state.longitude,
						latitudeDelta: 0.009,
						longitudeDelta: 0.009
					}}
					onRegionChange={this.onRegionChange.bind(this)}
				>
					<MapView.Marker
						coordinate={{
							latitude: this.state.latitude,
							longitude: this.state.longitude,
							latitudeDelta: 0.009,
							longitudeDelta: 0.009
						}}
						title={'Your Location'}
					/>
				</MapView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		// ...StyleSheet.absoluteFillObject
		flex: 1
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	map: {
		// ...StyleSheet.absoluteFillObject
		flexGrow: 1
	}
});
function mapStateToProps(state) {
	console.warn('I am the stateeeeeeeeeeeeeeeeeeeeeeeeeeee', state.user);
	return {
		user: state.user,
		token: state.token
	};
}
export default connect(mapStateToProps)(Home);
