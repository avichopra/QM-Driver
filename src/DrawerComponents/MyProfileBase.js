import React, { Component } from "react";
import { Text, View, Keyboard } from "react-native";
import { callApi } from "../utilities/serverApi";
import ImageResizer from "react-native-image-resizer";

import SplashScreen from "react-native-splash-screen";
import ImagePicker from "react-native-image-picker";
import { setUser, setDriver } from "../redux/index";
import { Alert } from "../ReusableComponents/modal";
import { checkEmpty } from "../utilities/validation";
import Axios from "axios";
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      contactNo: "",
      imageSelected: false,
      profileImage: "",
      userName: "",
      avatarSource: null,
      picture: "",
      userName: "",
      loading: false,
      contactNoError: ""
    };
  }

  onHandleChange = (name, value, field) => {
    if (this.state.contactNoError !== "") {
      this.setState({ contactNoError: "" });
    }
    if (field) {
      this.state[field] = value;
      this.setState({});
    } else {
      this.state[name] = value;
      this.setState({});
    }
    console.log("this.state>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.state);
  };
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  goToOtp = () => {
    this.props.navigation.navigate("OTP", {
      contactNo: this.state.newContactNo,
      email: this.props.user.email,
      routeName: "MyProfile"
    });
  };
  clearName = () => {
    this.setState({ userName: "" });
  };
  checkPhoneVerified = () => {
    console.warn("phn vrr", this.props.user.phoneVerified);
    if (this.props.user.phoneVerified === false) {
      Alert({
        message: "Your new contact number is not verified please verify it",
        buttons: [
          {
            title: "Verify",
            icon: false,
            backgroundColor: "blue",
            onPress: this.goToOtp
          }
        ]
      });
    }
  };
  checkLength = () => {
    if (this.state.contactNo.length !== 10) {
      this.setState({ contactNoError: "Contact No length should be equal to  10" });
      return true;
    } else {
      return false;
    }
  };
  componentDidMount() {
    // this.state.userName = this.props.user.fullname;
    // this.state.emergencyContactNo = this.props.user.emergencycontactnumber;
    let { email, contactNo, picture, fullname, emergencycontactnumber } = this.props.user;
    this.setState({ email, contactNo, picture, userName: fullname, emergencyContactNo: emergencycontactnumber });

    // this.state.DUN = this.props.driver.driverUniqueNo;
    // this.state.vehicleNo = this.props.driver.vehicleNo;
    this.checkPhoneVerified();
    // setTimeout(() => {
    // 	SplashScreen.hide();
    // }, 2000);
  }

  onSave = () => {
    Keyboard.dismiss();
    let { contactNo } = this.state;
    let contactNoError = checkEmpty(contactNo);
    contactNoError && true ? this.setState({ contactNoError: "Contact Number Cannot be empty" }) : "";
    contactNoError === false ? (contactNoError = this.checkLength()) : "";
    if (contactNoError === false) {
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${this.props.token}`
      };
      if (this.state.contactNo !== this.props.user.contactNo) {
        let data = {
          phoneVerified: false,
          picture: this.state.picture,
          fullname: this.state.userName,
          newContactNo: this.state.contactNo
        };
        this.setState({ loading: true });
        callApi("post", "v1/daffo/dispatch/updateDriver", data, headers)
          .then(result => {
            this.setState({ loading: false });
            console.log(result.data.updatedUser);
            setUser(result.data.updatedUser);

            this.props.navigation.navigate("OTP", {
              contactNo: this.state.contactNo,
              email: this.props.user.email,
              routeName: "MyProfile"
            });
          })
          .catch(err => {
            console.log("error from myProfile Base ", err.response, err.status, err);
          });
      } else {
        console.warn("My profile being called");
        this.setState({ loading: true });
        let data = {
          picture: this.state.picture,
          fullname: this.state.userName
        };
        callApi("post", "v1/daffo/dispatch/updateDriver", data, headers)
          .then(result => {
            this.setState({ loading: false });
            console.log(result.data.updatedUser);
            setUser(result.data.updatedUser);
          })
          .catch(err => {
            console.log("error from myProfile Base ", err.response, err.status, err);
          });
      }
    }
  };
  cameraClicked = () => {
    const options = {
      title: "Select Avatar"
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let data = new FormData();

        ImageResizer.createResizedImage(response.uri, 164, 164, "JPEG", 100, 0).then(result => {
          data.append("file", {
            uri: result.uri,
            type: "image/jpeg",
            name: result.name
          });
          data.append("bucket", "public");
          let headers = {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            authorization: `Bearer ${this.props.token}`
          };

          callApi("post", "v1/daffo/dispatch/upload", data, headers)
            .then(result1 => {
              this.setState({ picture: result1.data[0].file.filename });
            })
            .catch(err => {});
        });
      }
    });
  };

  GeneralInfoPressed = () => {
    this.setState({ GeneralInfoPressed: true, AdditionalInfoPressed: false });
  };
  AdditionalInfoPressed = () => {
    this.setState({ GeneralInfoPressed: false, AdditionalInfoPressed: true });
  };
}
