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
import MapView, { PROVIDER_GOOGLE, Marker,Polyline } from 'react-native-maps';
import { connect } from 'react-redux';
import ReasonOfCancellation from './HomeComponents/ReasonOfCancellation';
import Base from './HomeBase';
// import PickedPatient from './HomeComponents/PickedPatient';
// import CallPatient from './HomeComponents/CallPatient';
import { AcceptDecline, CallPatient, PickedPatient } from './HomeComponents/HomeComponents';
class Home extends Base {
	render() {
		return this.state.showReasons === true ? (
			<ReasonOfCancellation onShowReasons={this.onShowReasons} onSubmit={this.onSubmit} />
		) : (
			<View style={style.container}>
				<Header title={'Quick Medic'} openDrawer={this.openDrawer} />

				{this.state.loading ? (
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator size="large" color="#000" />
					</View>
				) : (
					<MapView
						provider={PROVIDER_GOOGLE}
						style={[ style.map ]}
						showsUserLocation={true}
						mapType="standard"
						followsUserLocation={true}
						showsBuildings={true}
						showsTraffic={true}
						loading
						ref={(map) => {
							this.map = map;
						}}
						initialRegion={{
							latitude: this.state.latitude,
							longitude: this.state.longitude,
							latitudeDelta: 0.015,
							longitudeDelta: 0.0121
						}}
						onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
							onUserLocationChange={(locationChangedResult) =>
								this.setUserLocation(locationChangedResult.nativeEvent.coordinate)}
						// onRegionChange={this.onRegionChange.bind(this)}
					>
						{this.state.pointCoords && (
								<Polyline
									coordinates={this.state.pointCoords}
									strokeColor={'#1d78e2'}
									strokeWidth={8}
								/>
							)}
						<Marker.Animated
								ref={(marker) => {
									this.marker = marker;
								}}
								coordinate={this.state.coordinate}
								title={'Your Location'}
							/>
								{this.state.showdes && (
								<Marker.Animated
									ref={(desmarker) => {
										this.desmarker = desmarker;
									}}
									coordinate={this.state.destination}
									description={'destination'}
									rotate={90}
								>
									<Image
										source={{ uri: 'mipmap/ambulance1' }}
										style={{ width: 100, height: 30 }}
										resizeMode={'contain'}
									/>
								</Marker.Animated>
							)}
					</MapView>
				)}
				<View
					style={{
						width: '90%',
						alignSelf: 'center',
						height: 50,
						backgroundColor: 'white',
						position: 'absolute',
						marginTop: 80,
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<Text
						style={{
							width: '86%',
							fontSize: 18,
							color: 'grey',
							marginLeft: 10
						}}
					>
						Some location.......................
					</Text>
					<View style={{ height: 28, width: 1, backgroundColor: 'grey' }} />
					<Image
						style={{ height: 20, width: 20, marginLeft: 5 }}
						source={{ uri: 'mipmap/navigation' }}
						resizeMode="contain"
					/>
				</View>
				{this.props.showAcceptDecline && true ? (
					<AcceptDecline
						onAccept={this.onAccept}
						onReject={this.onReject}
						patient={this.props.patient}
						location={this.props.patientLocation}
					/>
				) : this.props.patient !== null ? (
					<CallPatient Call={this.Call} patient={this.props.patient} location={this.props.patientLocation} />
				) : null}
				{/* <PickedPatient /> */}
			</View>
		);
	}
}
const style = StyleSheet.create({
	container: {
		// ...styleheet.absoluteFillObject
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
		// ...styleheet.absoluteFillObject
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
