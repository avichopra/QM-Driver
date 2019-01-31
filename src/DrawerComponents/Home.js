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
let screen=Dimensions.get("window")
const Aspect_Ratio=screen.width/screen.height;
let latitude_Delta=0.0922;
let longitude_Delta=latitude_Delta*Aspect_Ratio;
// import Geolocation from 'react-native-geolocation-service';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
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
	ScrollView,
	ActivityIndicator
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { callApi } from '../utilities/serverApi';
import { setDriver } from '../redux';
import Store from "../redux/store/index"
import {addLocation} from "../redux/actions/index"
const { width, height } = Dimensions.get('window');
class Home extends Component {
	constructor() {
		super();
		this.state = {
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0,
			longitudeDelta: 0,
			currentPlace: '',
			loading:true
		};
	}
	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}
	openDrawer = () => {
		console.log('open drawer being called>>>>>>>>>>>>>>>>>>>>');
		this.props.navigation.openDrawer();
	};
	requestLocationPermission=async ()=>{
		try {
		  const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
			  'title': 'Location Permission',
			  'message': 'This app needs access to your location',
			}
		  )
		  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.warn("You can use the location")
		  } else {
			console.warn("Location permission denied")
		  }
		} catch (err) {
		  console.warn(err)
		}
	  }
	componentWillMount() {
	     console.warn("Location in redux",this.props.location)
		if(this.props.location!=null)
		{
			this.setState({loading:false,latitude:this.props.location.latitude,longitude:this.props.location.longitude})
               
		}
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
		LocationServicesDialogBox.checkLocationServicesIsEnabled({ 
			message: "<h3>Use Location?</h3> \
						This app wants to change your device settings:<br/><br/>\
						Use GPS for location<br/><br/>", 
			ok: "YES", 
			cancel: "NO" 
		}).then(() => { 
			RNGooglePlaces.getCurrentPlace()
			.then((results) =>{
               Store.dispatch(addLocation({latitude:results[0].latitude,longitude:results[0].longitude}))
				this.setState({
					loading:false,currentPlace: `${results[0].name},${results[0].address}`,latitude:results[0].latitude,longitude:results[0].longitude
				})
				console.warn("current place",results)
			})
			.catch((error) => console.warn(error.message));
		})
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				console.warn("location changed")
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
				console.warn(error);
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		);
		// this.getDirection('29.132963299999993,75.7534505', '29.1328949,75.753995');
		// this._askForLocationServices();
		// this.requestLocationPermission()
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
	// _askForLocationServices() {
	// 	PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
	// 		title: 'question',
	// 		message: 'gimme that location'
	// 	}).then((granted) => {
	// 		console.log('granted', granted);
	// 		// always returns never_ask_again
	// 	});
	// }
	// onRegionChange(region) {
	// 	this.setState({
	// 	  latitude: region.latitude,
	// 	  longitude: region.longitude,
	// 	  latitudeDelta: region.latitudeDelta,
	// 	  longitudeDelta: region.longitudeDelta
	// 	});
	// 	console.warn("region changed", region);
	// }
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
		// console.log('Current position', this.state.latitude, this.state.longitude);
		return (
			<View style={styles.container}>
				<Header title={'Quick Medic'} openDrawer={this.openDrawer} />

				{this.state.loading?<View style={{flex:1,alignItems:"center",justifyContent:"center"}}><ActivityIndicator size="large" color="#000" /></View>:<MapView
					provider={PROVIDER_GOOGLE}
					style={[ styles.map ]}
					showsUserLocation={true}
					mapType="standard"
					followsUserLocation={true}
					showsBuildings={true}
					showsTraffic={true}
					loading
					region={{
						latitude: this.state.latitude,
						longitude: this.state.longitude,
						latitudeDelta: latitude_Delta,
						longitudeDelta: longitude_Delta
					}}
					// onRegionChange={this.onRegionChange.bind(this)}
				>
					<MapView.Marker
						coordinate={{
							latitude: this.state.latitude,
							longitude: this.state.longitude,
							latitudeDelta: latitude_Delta,
							longitudeDelta: longitude_Delta
						}}
						title={'Your Location'}
					/>
				</MapView>}
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
	// console.warn('I am the stateeeeeeeeeeeeeeeeeeeeeeeeeeee', state.user);
	return {
		user: state.user,
		token: state.token,
		location:state.Location
	};
}
export default connect(mapStateToProps)(Home);
