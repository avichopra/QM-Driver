import React, { Component } from 'react';
import Header from './Header';
const { width, height } = Dimensions.get('window');

let screen = Dimensions.get('window');
const Aspect_Ratio = screen.width / screen.height;
let latitude_Delta = 0.0922;
let longitude_Delta = latitude_Delta * Aspect_Ratio;
// import Geolocation from 'react-native-geolocation-service';
import AcceptDecline from './HomeComponents/AcceptDecline';
import CallPatient from './HomeComponents/CallPatient';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	Image,
	Button,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	PermissionsAndroid
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { connect } from 'react-redux';

import Base from './HomeBase';
class Home extends Base {
	render() {
		// console.log('Current position', this.state.latitude, this.state.longitude);
		return (
			<View style={styles.container}>
				<Header title={'Quick Medic'} openDrawer={this.openDrawer} />

				{this.state.loading ? (
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator size="large" color="#000" />
					</View>
				) : (
					<MapView
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
					</MapView>
				)}
				{console.warn('patient>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.props.patientLocation)}
				{this.props.showAcceptDecline && true && this.state.accept === false ? (
					<AcceptDecline
						onAccept={this.onAccept}
						onReject={this.onReject}
						patient={this.props.patient}
						location={this.props.patientLocation}
					/>
				) : this.state.accept === true ? (
					<CallPatient Call={this.Call} patient={this.props.patient} location={this.props.patientLocation} />
				) : null}
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
	return {
		user: state.user,
		token: state.token,
		location: state.Location,
		patient: state.patient,
		showAcceptDecline: state.showAcceptDecline,
		patientLocation: state.patientLocation,
		allDrivers: state.allDrivers,
		driver: state.driver
	};
}
export default connect(mapStateToProps)(Home);
