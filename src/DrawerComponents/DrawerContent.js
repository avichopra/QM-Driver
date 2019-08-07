import React, { Component, Fragment } from "react";
import { NavigationActions, StackActions } from "react-navigation";
import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import DrawerItem from "../ReusableComponents/DrawerItem";
import { connect } from "react-redux";
import * as Storage from "../utilities/asyncStorage";
import store from "../utilities/store";
import Svg, { Path, Ellipse } from "react-native-svg";
import config from "../config/index";
import Store from "../redux/store/index";
import { cancelTrip } from "../redux/actions/index";
import { callApi } from "../utilities/serverApi";
class DrawerContent extends Component {
  navigateToScreen = route => {
    store.getInstance().setKeyWithRef("CurrentScreen", { route: route, navigation: this.props.navigation });

    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })]
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.closeDrawer();
  };
  onPressLogout = async () => {
    this.props.navigation.closeDrawer();
    let email;
    await Storage.get("user").then(data => {
      email = data.email;
    });
    await Storage.remove("token");
    await Storage.remove("user");
    await Store.dispatch(cancelTrip());
    let data = { email: email, status: false };
    callApi("post", "v1/daffo/dispatch/updateOnlinestatus", data)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    this.props.navigation.navigate("Login");
  };
  render() {
    let { picture = "" } = this.props.user;
    return (
      <View style={styles.DrawerContent}>
        <View>
          <Svg width={"100%"} height={200} style={{ backgroundColor: "transparent" }}>
            <Ellipse cx={150} cy={45} rx={200} ry={110} fill={"#E8F0FD"} />
          </Svg>
        </View>
        <DrawerItem title={"Home"} navigateToScreen={this.navigateToScreen} route={"Home"} name={"home"} />
        <DrawerItem
          title={"My Profile"}
          navigateToScreen={this.navigateToScreen}
          route={"MyProfile"}
          name={"profile"}
        />
        <DrawerItem
          title={"Change Password"}
          navigateToScreen={this.navigateToScreen}
          route={"ChangePassword"}
          name={"drawer_key"}
        />
        <DrawerItem title={"History"} navigateToScreen={this.navigateToScreen} route={"History"} name={"history"} />

        <DrawerItem title={"Logout"} navigateToScreen={this.onPressLogout} route={"Logout"} name={"logout"} />

        <View style={{ position: "absolute", width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              backgroundColor: "transparent",
              alignSelf: "center",
              alignItems: "center",
              marginTop: 20
            }}
            onPress={() => {
              this.navigateToScreen("MyProfile");
            }}
          >
            <Image
              source={{
                uri:
                  picture === "" || picture === null
                    ? "asset:/icon/def.png"
                    : `${config.SERVER_URL}/v1/daffo/file/${picture}`
              }}
              style={{
                height: 90,
                width: 90,
                borderRadius: 50,
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: "white",

                borderWidth: 2
              }}
            />
          </TouchableOpacity>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ color: "black" }} numberOfLines={1}>
              {this.props.user.fullname ? this.props.user.fullname.split(" ")[0] : ""}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  DrawerContent: { height: 800, backgroundColor: "transparent" }
});
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(DrawerContent);
