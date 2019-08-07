import React from "react";
import { Linking } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Drawer from "./DrawerNavigator";
import Login from "./Login/login";
import Oauth from "./oAuthComponent/oauth";
import OTP from "./OTP/otp";
import Reset from "./reset/reset";
import ResetPassword from "./ResetPassword/Reset";
const SwitchRouteConfig = {
  Login: Login,
  Reset: Reset,
  Oauth: Oauth,
  Drawer: Drawer,
  OTP: OTP,
  ResetPassword: ResetPassword
};

const SwitchConfig = {
  initialRouteName: "Oauth"
};
const SwitchNavigator = createSwitchNavigator(SwitchRouteConfig, SwitchConfig);

class SwitchNavigatorWrapper extends React.Component {
  static router = SwitchNavigator.router;

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
  }
  handleOpenURL = event => {
    this.navigateTo(event.url);
  };

  componentWillUnmount() {
    Linking.removeAllListeners("url");
  }

  navigateTo = url => {
    console.log("Inside navigate url", url);
    if (url === null) {
      console.log("url", url);
      return;
    }
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, "");
    const routeParams = route.split("/");
    let routeName = routeParams[0];
    let email = routeParams[1];
    if (routeName === "reset") {
      let resetPasswordToken = routeParams[2];
      console.log(" reset");
      this.props.navigation.navigate("ResetPassword", { email: email, token: resetPasswordToken });
    }
  };
  render() {
    return <SwitchNavigator navigation={this.props.navigation} />;
  }
}

export default createAppContainer(SwitchNavigatorWrapper);
