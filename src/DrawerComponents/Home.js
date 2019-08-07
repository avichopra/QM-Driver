import React, { Component } from "react";
import Header from "./Header";
const { width, height } = Dimensions.get("window");

let screen = Dimensions.get("window");
const Aspect_Ratio = screen.width / screen.height;
let latitude_Delta = 0.0922;
let longitude_Delta = latitude_Delta * Aspect_Ratio;
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { connect } from "react-redux";
import ReasonOfCancellation from "./HomeComponents/ReasonOfCancellation";
import Base from "./HomeBase";
import { AcceptDecline, ShowPatient, PickedPatient } from "./HomeComponents/HomeComponents";
class Home extends Base {
  render() {
    const { angle } = this.props.gpsData != null && this.props.gpsData;
    console.warn("rendered");
    return this.state.showReasons === true ? (
      <ReasonOfCancellation onShowReasons={this.onShowReasons} onSubmit={this.onSubmit} />
    ) : (
      <View style={style.container}>
        <Header title={"UP 108 Driver"} openDrawer={this.openDrawer} />

        {this.state.loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[style.map]}
            showsUserLocation={true}
            mapType="standard"
            followsUserLocation={true}
            showsBuildings={true}
            showsPointsOfInterest={true}
            showsIndoors={true}
            loading
            rotateEnabled={true}
            ref={map => {
              this.map = map;
            }}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009
            }}
            onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            onUserLocationChange={locationChangedResult =>
              this.setUserLocation(locationChangedResult.nativeEvent.coordinate)
            }
          >
            {this.props.trip != null && this.props.pickedLocationCoord != null && (
              <Polyline coordinates={this.props.pickedLocationCoord} strokeColor={"#1d78e2"} strokeWidth={8} />
            )}
            {this.props.trip != null && this.props.hospitalLocationCoord != null && (
              <Polyline coordinates={this.props.hospitalLocationCoord} strokeColor={"#1d78e2"} strokeWidth={8} />
            )}
            {this.props.trip != null && (
              <Marker
                coordinate={{
                  latitude: parseFloat(this.props.trip.hospitalLocation.lat),
                  longitude: parseFloat(this.props.trip.hospitalLocation.long)
                }}
                title={`Hospital Location,${this.props.trip.hospitalName},${this.props.trip.hospitalAddress}`}
                flat={true}
              >
                <Image source={{ uri: "mipmap/hospital" }} style={{ width: 50, height: 50 }} resizeMode={"contain"} />
              </Marker>
            )}
            {this.props.trip != null && (
              <Marker.Animated
                ref={desmarker => {
                  this.desmarker = desmarker;
                }}
                flat={true}
                coordinate={{
                  latitude: parseFloat(this.props.trip.driverLocation.lat),
                  longitude: parseFloat(this.props.trip.driverLocation.long)
                }}
                title={"Your Location"}
                style={{
                  transform: [
                    {
                      rotate: this.props.gpsData != null ? `${angle}deg` : "0deg"
                    }
                  ]
                }}
              >
                <Image
                  source={{ uri: "mipmap/ambulance1" }}
                  style={{
                    width: 50,
                    height: 50,
                    transform: [{ rotate: "270deg" }]
                  }}
                  resizeMode={"contain"}
                />
              </Marker.Animated>
            )}
            {this.props.trip != null && (
              <Marker.Animated
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={{
                  latitude: parseFloat(this.props.trip.patientLocation.lat),
                  longitude: parseFloat(this.props.trip.patientLocation.long)
                }}
                title={`PickUp Location${this.props.trip.patientAddress}`}
                image={{ uri: "mipmap/currentlocation" }}
              />
            )}
            {this.props.pickedLocationCoord != null && (
              <Marker
                flat={true}
                title={"Picked Location Distance,Time"}
                coordinate={this.props.pickedLocationCoord[parseInt(this.props.pickedLocationCoord.length / 2)]}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 5,
                    borderColor: "black",
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Image
                    source={{ uri: "mipmap/ambulance1" }}
                    style={{ width: 20, height: 20, margin: 10 }}
                    resizeMode={"contain"}
                  />
                  <Text style={{ margin: 10 }}>
                    {this.props.pickedDuration.distance},{this.props.pickedDuration.duration}
                  </Text>
                </View>
              </Marker>
            )}
            {this.props.hospitalLocationCoord != null && (
              <Marker
                flat={true}
                title={"Hospital Location Distance,Time"}
                coordinate={this.props.hospitalLocationCoord[parseInt(this.props.hospitalLocationCoord.length / 2)]}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 5,
                    borderColor: "black",
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Image
                    source={{ uri: "mipmap/hospital" }}
                    style={{ width: 20, height: 20, margin: 10 }}
                    resizeMode={"contain"}
                  />
                  <Text style={{ margin: 10 }}>
                    {this.props.hospitalDuration.distance},{this.props.hospitalDuration.duration}
                  </Text>
                </View>
              </Marker>
            )}
          </MapView>
        )}
        {this.props.trip != null && (
          <View
            style={{
              flexDirection: "row",
              width: window.width,
              height: 50,
              padding: 5,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              backgroundColor: "#fff",
              elevation: 20,
              position: "absolute",
              marginTop: 60,
              alignSelf: "center"
            }}
          >
            <ScrollView
              contentContainerStyle={{ alignItems: "center" }}
              style={{ width: "90%" }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Text style={{ fontSize: 18 }}>{this.props.trip.patientAddress}</Text>
            </ScrollView>
            <View style={{ height: 28, width: 1, backgroundColor: "grey" }} />
            <TouchableOpacity onPress={this.navigationMap}>
              <Image
                style={{ height: 20, width: 20, marginLeft: 5 }}
                source={{ uri: "mipmap/navigation" }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
        {this.props.trip != null ? (
          this.props.trip.pickedPatient ? (
            <PickedPatient Call={this.Call} onCliclPickPatientComplete={this.markComplete} trip={this.props.trip} />
          ) : (
            <ShowPatient Call={this.Call} patient={this.props.trip} onClickPickPatient={this.onClickPickPatient} />
          )
        ) : this.props.patientTempData != null ? (
          <AcceptDecline onAccept={this.onAccept} onReject={this.onReject} patient={this.props.patientTempData} />
        ) : null}
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  map: {
    flexGrow: 1
  }
});
function mapStateToProps(state) {
  console.log("state>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", state);
  return {
    user: state.user,
    token: state.token,
    location: state.Location,
    trip: state.trip,
    patientTempData: state.patientTempData,
    pickedLocationCoord: state.pickedLocationCoord,
    hospitalLocationCoord: state.hospitalLocationCoord,
    gpsData: state.gpsData,
    pickedDuration: state.pickedDuration,
    hospitalDuration: state.hospitalDuration,
    hospitalReRoute: state.hospitalReRoute,
    pickedReRoute: state.pickedReRoute
  };
}
export default connect(mapStateToProps)(Home);
