import { TouchableOpacity } from "react-native";
import React, { Component } from "react";
export default class button extends Component {
  render() {
    const { ...props } = this.props;
    return <TouchableOpacity {...props} />;
  }
}
