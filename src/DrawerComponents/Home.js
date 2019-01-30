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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { callApi } from '../utilities/serverApi';
import { setDriver } from '../redux';

=======
import { callApi } from '../utilities/serverApi';
import {connect} from "react-redux"
import {setPatient} from "../redux/index"
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});
>>>>>>>  changes app icon login rest
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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
=======
	componentWillMount()
	{
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		console.warn("token",this.props.token)
		callApi(
			'post',
			'v1/daffo/Patient/getOwn',
			{ perPage: 1, filter: { userId: this.props.user.id} },
			headers
		).then((result) => {
			console.warn('resultttttttttttttttttttttttttttttt getOwn', result.data[0]);
			result.data[0] ?  setPatient(result.data[0]) : '';
		});
	}
>>>>>>>  changes app icon login rest
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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
=======
				// place represents user's selection from the
				// suggestions and it is a simplified Google Place object.
>>>>>>>  changes app icon login rest
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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
=======
					// camera={{ zoom: 50 }}
>>>>>>>  changes app icon login rest
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
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
=======
				<View
					style={{
						flexDirection: 'row',
						width: window.width,
						// margin: 30,
						height: 50,
						padding: 5,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 5,
						backgroundColor: '#fff',
						elevation: 20,
						position: 'absolute',
						marginTop: 60,
						// marginLeft: 20,
						// marginRight: 20,
						alignSelf: 'center'
					}}
				>
					<ScrollView
						contentContainerStyle={{ alignItems: 'center' }}
						style={{ width: '90%' }}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<Text
							style={{
								borderBottomWidth: 2,
								borderBottomColor: '#507CFC',
								fontSize: 18
							}}
							onLongPress={this.AutoCom}
						>
							{this.state.currentPlace}
						</Text>
					</ScrollView>
					<View style={{ whidth: '10%' }}>
						<Image source={{ uri: 'mipmap/map' }} style={{ height: 19, width: 19 }} resizeMode="contain" />
					</View>
				</View>
>>>>>>>  changes app icon login rest
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
