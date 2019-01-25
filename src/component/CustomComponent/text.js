import { Text } from "react-native";
import React, { Component } from "react";
export default class text extends Component {
  render() {
    const { ...props } = this.props;
    return <Text {...props} />;
  }
}
