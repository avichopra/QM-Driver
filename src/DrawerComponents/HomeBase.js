import _ from "lodash";
import { Component } from "react";
import { NativeModules } from "react-native";
import axios from "axios";
import PolyLine from "@mapbox/polyline";
import RNGooglePlaces from "react-native-google-places";
import { AnimatedRegion } from "react-native-maps";
import getDirections from "react-native-google-maps-directions";
import call from "react-native-phone-call";
import { setDriver } from "../redux";
import { unSubscribeSockets, saveSubscriptionInfo } from "../utilities/socket";
import GPSState from "react-native-gps-state";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import {
  addLocation,
  cancelPatientLocationCoord,
  saveTrip,
  addPatientLocationCoord,
  addHospitalLocationCoord,
  cancelTrip
} from "../redux/actions/index";
import { deviceGpsData } from "../utilities/socket";
import Store from "../redux/store/index";
import { callApi } from "../utilities/serverApi";
let latitude_delta = 0.009,
  longitude_delta = 0.009;
let currentCoordinate = null;
let locationUpdate;
export default class HomeBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
      currentPlace: "",
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
  Call = Type => {
    console.log("type", Type);
    const args = {
      number: Type === "CN" ? this.props.trip.hospitalNo : Type,
      prompt: false
    };
    call(args).catch(console.error);
  };
  onShowReasons = value => {
    this.setState({ showReasons: value });
  };
  markComplete = () => {
    Store.dispatch(cancelTrip());
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${this.props.token}`
    };
    let data = {
      driverData: this.props.trip.driverId.userId._id,
      patientData: this.props.trip.patientId.userId._id,
      updateLocation: currentCoordinate
    };
    callApi("post", "v1/daffo/dispatch/tripCompleted", data, headers)
      .then(response => {
        console.log("response", response);
      })
      .catch(err => {
        console.log("error from home base", err);
      });
  };
  navigationMap = async () => {
    console.log("Navigation map data", this.props.trip);
    let data;
    this.props.trip.pickedPatient
      ? (data = {
          source: {
            latitude:
              currentCoordinate != null
                ? currentCoordinate.latitude
                : parseFloat(this.props.trip.patientLocation.lat),
            longitude:
              currentCoordinate != null
                ? currentCoordinate.longitude
                : parseFloat(this.props.trip.patientLocation.long)
          },
          destination: {
            latitude: parseFloat(this.props.trip.hospitalLocation.lat),
            longitude: parseFloat(this.props.trip.hospitalLocation.long)
          },
          params: [
            {
              key: "travelmode",
              value: "driving"
            }
          ]
        })
      : (data = {
          source: {
            latitude:
              currentCoordinate != null
                ? currentCoordinate.latitude
                : this.state.latitude,
            longitude:
              currentCoordinate != null
                ? currentCoordinate.longitude
                : this.state.longitude
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
          ]
        });
    console.log("data before navigation", data);
    getDirections(data);
  };
  reRoute = (data, status) => {
    NativeModules.SLRNGeoFencing.isLocationOnPath(
      {
        lat: parseFloat(data.gpsData.latitude),
        lng: parseFloat(data.gpsData.longitude)
      },
      status ? this.props.hospitalReRoute : this.props.pickedReRoute,
      40,
      response => {
        if (!response) {
          let customisedData = {
            ...data.trip.patientLocation,
            Gps_Data: data.gpsData
          };
          let customisedData1 = {
            ...data.trip,
            Gps_Data: data.gpsData
          };
          if (status) this.getHospitalRouteDirection(customisedData1, true);
          else this.getPickupRouteDirection(customisedData, true);
        }
        console.log(">>>>>>points on polyline >>>>>>", response);
      }
    );
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.trip != null) {
      if (nextProps.pickedLocationCoord === null) {
        if (nextProps.trip.pickedPatient === false)
          this.getPickupRouteDirection(nextProps.trip.patientLocation, false);
      }
      if (nextProps.hospitalLocationCoord === null) {
        this.getHospitalRouteDirection(nextProps.trip, false);
      }
    }
    if (this.props.gpsData != nextProps.gpsData) {
      if (nextProps.trip.pickedPatient === false) {
        if (nextProps.pickedReRoute != null) {
          this.reRoute(nextProps, false);
        }
      } else {
        if (nextProps.hospitalReRoute != null) {
          this.reRoute(nextProps, true);
        }
      }
      this.desmarker._component.animateMarkerToCoordinate(
        {
          latitude: parseFloat(nextProps.gpsData.latitude),
          longitude: parseFloat(nextProps.gpsData.longitude)
        },
        2000
      );
      let newCoordinate = {
        latitude: parseFloat(nextProps.gpsData.latitude),
        longitude: parseFloat(nextProps.gpsData.longitude),
        latitudeDelta: latitude_delta,
        longitudeDelta: longitude_delta
      };
      this.map.animateToRegion(newCoordinate, 1000);
    }
  }
  getPickupRouteDirection = async (patientLocation, reRoute) => {
    let method = "get",
      url = `https://maps.googleapis.com/maps/api/directions/json?origin=${
        reRoute
          ? patientLocation.Gps_Data.latitude
          : currentCoordinate != null
          ? currentCoordinate.latitude
          : this.state.latitude
      },${
        reRoute
          ? patientLocation.Gps_Data.longitude
          : currentCoordinate != null
          ? currentCoordinate.longitude
          : this.state.longitude
      }&destination=${patientLocation.lat},${
        patientLocation.long
      }&key=AIzaSyAYl-EN9gKgW4DflxwhYmHIt4RqP5vT-WY`,
      headers = { "content-type": "application/json" };
    let option = {
      method,
      url,
      headers
    };
    axios(option).then(response => {
      const points = PolyLine.decode(
        response.data.routes[0].overview_polyline.points
      );
      let pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      let Polygon = points.map(point => {
        return { lat: point[0], lng: point[1] };
      });
      Store.dispatch(
        addPatientLocationCoord(
          pointCoords,
          {
            distance: response.data.routes[0].legs[0].distance.text,
            duration: response.data.routes[0].legs[0].duration.text
          },
          Polygon
        )
      );
      if (this.props.trip === null) this.map.fitToCoordinates(pointCoords);
      console.log("Point Coords", pointCoords);
    });
  };
  getHospitalRouteDirection = async (data, reRoute) => {
    let method = "get",
      url = `https://maps.googleapis.com/maps/api/directions/json?origin=${
        reRoute ? data.Gps_Data.latitude : data.patientLocation.lat
      },${
        reRoute ? data.Gps_Data.longitude : data.patientLocation.long
      }&destination=${data.hospitalLocation.lat},${
        data.hospitalLocation.long
      }&key=AIzaSyAYl-EN9gKgW4DflxwhYmHIt4RqP5vT-WY`,
      headers = { "content-type": "application/json" };
    let option = {
      method,
      url,
      headers
    };
    axios(option).then(response => {
      const points = PolyLine.decode(
        response.data.routes[0].overview_polyline.points
      );
      let pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      let Polygon = points.map(point => {
        return { lat: point[0], lng: point[1] };
      });
      Store.dispatch(
        addHospitalLocationCoord(
          pointCoords,
          {
            distance: response.data.routes[0].legs[0].distance.text,
            duration: response.data.routes[0].legs[0].duration.text
          },
          Polygon
        )
      );
    });
  };
  onAccept = async () => {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${this.props.token}`
    };
    let { currentPlace = "", latitude = "", longitude = "" } = this.state;
    let { user = {}, patientTempData = {} } = this.props;
    await unSubscribeSockets("Trip");
    await saveSubscriptionInfo("TripInProgress", []);
    this.setState({ accept: true, reject: false });
    console.warn("user data on Accept", user.id);
    let data = {
      patient: {
        RequestData: patientTempData.patient.RequestData,
        patientId: patientTempData.patient.userId,
        patientLocation: {
          currentPlace: patientTempData.location.currentPlace,
          latitude: patientTempData.location.latitude,
          longitude: patientTempData.location.longitude
        }
      },
      driver: {
        deviceId: user.deviceId,
        driverId: user.id,
        driverLocation: {
          currentPlace: currentPlace,
          latitude: currentCoordinate.latitude,
          longitude: currentCoordinate.longitude
        }
      }
    };
    callApi("post", "v1/daffo/dispatch/ambulanceRequestAccepted", data, headers)
      .then(response => {
        Store.dispatch(saveTrip(response.data.trip));
        unSubscribeSockets("TripInProgress");
        console.log("response", response);
      })
      .catch(err => {
        console.log("error from home base", err);
      });
  };
  onReject = () => {
    this.setState({ showReasons: true });
  };
  onSubmit = async value => {
    this.setState({ showReasons: false });
    Store.dispatch(cancelTrip());
    await unSubscribeSockets("Trip");
  };
  onClickPickPatient = async () => {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${this.props.token}`
    };
    let data = {
      driverData: this.props.trip.driverId,
      patientData: this.props.trip.patientId
    };

    callApi("post", "v1/daffo/dispatch/pickedUpPatient", data, headers)
      .then(response => {
        console.log("response", response);
        Store.dispatch(saveTrip(response.data.trip));
        Store.dispatch(cancelPatientLocationCoord());
      })
      .catch(err => {
        console.log("error from home base", err);
      });
  };
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    GPSState.removeListener();
  }
  openDrawer = () => {
    console.log("open drawer being called>>>>>>>>>>>>>>>>>>>>");
    this.props.navigation.openDrawer();
  };
  componentWillMount() {
    console.warn("Location in redux", this.props.location);
    if (this.props.showAcceptDecline === false && this.props.patient != null)
      this.setState({
        destination: {
          latitude: this.props.patientLocation.latitude,
          longitude: this.props.patientLocation.longitude
        }
      });
    if (this.props.location != null) {
      this.setState({
        loading: false,
        latitude: this.props.location.latitude,
        longitude: this.props.location.longitude
      });
    }
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${this.props.token}`
    };
    let data = {
      perPage: 1,
      fields: { ambulanceId: { vehicleNo: 1 } },
      filter: { driverId: this.props.user.id }
    };
    console.warn("token", this.props.token);
    Promise.all([
      callApi("post", "v1/daffo/AssignAmbulance/getOwn", data, headers),
      callApi(
        "post",
        "v1/daffo/Driver/getOwn",
        { perPage: 1, filter: { userId: this.props.user.id } },
        headers
      )
    ])
      .then(result => {
        console.log("results=========>>>>>>>>>>>>>", result);
        setDriver({
          ...result[1].data[0],
          ambulanceDetails: result[0].data[0].ambulanceId
        });
      })
      .catch(err => {
        console.log("errorrrrrrr>>>>>>>>>", err);
      });
  }
  checkLocationIsEnabled = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    }).then(data => {
      RNGooglePlaces.getCurrentPlace()
        .then(results => {
          Store.dispatch(
            addLocation({
              latitude: results[0].latitude,
              longitude: results[0].longitude
            })
          );
          this.setState({
            loading: false,
            currentPlace: `${results[0].name},${results[0].address}`,
            latitude: results[0].latitude,
            longitude: results[0].longitude
          });
          let headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: `Bearer ${this.props.token}`
          };
          let data = {
            driverId: this.props.user.id,
            location: {
              latitude: results[0].latitude,
              longitude: results[0].longitude
            }
          };
          callApi("post", "v1/daffo/dispatch/driverLocation", data, headers)
            .then(response => {
              console.warn("updated", response);
            })
            .catch(error => {
              console.log("Error", error);
            });
          console.warn("current place", results);
        })
        .catch(error => console.warn(error.message));
    });
  };
  componentDidMount() {
    locationUpdate = new Date();
    this.checkLocationIsEnabled();
    GPSState.addListener(status => {
      console.warn("location state", status);
      if (status === 1) {
        this.checkLocationIsEnabled();
      }
    });
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        console.log("location changed", position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      function(error) {
        console.warn(error);
      }
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  checkSignalTime = (prevTime, presentTime) => {
    let diff = (presentTime.getTime() - prevTime.getTime()) / 1000;
    if (Math.floor(diff) >= 7) {
      locationUpdate = new Date();
      return true;
    }
    return false;
  };
  setUserLocation = Coordinate => {
    const { latitude, longitude } = Coordinate;
    currentCoordinate = {
      latitude,
      longitude,
      latitudeDelta: latitude_delta,
      longitudeDelta: longitude_delta
    };
    if (this.props.trip === null && this.props.pickedLocationCoord === null) {
      const newCoordinate = {
        latitude,
        longitude,
        latitudeDelta: latitude_delta,
        longitudeDelta: longitude_delta
      };
      this.map.animateToRegion(newCoordinate, 1000);
    }
    // console.warn("Location>>>>>>>", Coordinate);
    // if (this.checkSignalTime(locationUpdate, new Date())) {
    //   console.log("time>>>>>>>greater than 7 sec");
    //   deviceGpsData({
    //     deviceId: parseInt(this.props.user.deviceId),
    //     latitude: latitude,
    //     longitude: longitude
    //   });
    // } else {
    //   console.log("less than 7 sec");
    // }
  };
  onRegionChangeComplete = region => {
    // console.log("region change scomplete>>>>", region);
    latitude_delta = region.latitudeDelta;
    longitude_delta = region.longitudeDelta;
  };
}
