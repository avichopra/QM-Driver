import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Header from "./Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerLabel: "Logout",
    drawerIcon: ({ tintColor }) => <Icon name={"logout"} size={25} color={"black"} />
  };
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  render() {
    return <Header title={"Quick Medic"} openDrawer={this.openDrawer} />;
  }
}
export default Logout;
