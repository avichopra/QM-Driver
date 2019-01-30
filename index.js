/** @format */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import {Component} from "react"
AppRegistry.registerComponent(appName, () => App);
export default class Index extends Component {
    componentWillUnmount() {
      if (Platform.os === "android") {
        // AppState.removeEventListener("change");
        Linking.removeAllListener("url");
      }
    }
  }