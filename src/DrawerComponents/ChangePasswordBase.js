import React, { Component } from "react";
import { Text, View, Keyboard } from "react-native";
import Axios from "axios";
import { callApi } from "../utilities/serverApi";
import { checkEmpty } from "../utilities/validation";
import { Alert } from "../../src/ReusableComponents/modal";
const emptyState = {
  oldPasswordError: "",
  newPassword: "",
  newPasswordError: "",
  confirmNewPassword: "",
  confirmNewPasswordError: "",
  oldPassword: "",

  loading: false
};
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }
  setEmpty = () => {
    this.setState(emptyState);
    this.setState({ oldPassword: "" });
  };
  onHandleChange = (name, value) => {
    let { oldPasswordError, newPasswordError, confirmNewPasswordError } = this.state;
    if (oldPasswordError !== "" && name === "oldPassword") {
      this.state.oldPasswordError = "";
    }
    if (newPasswordError !== "" && name === "newPassword") {
      this.state.newPasswordError = "";
    }
    if (confirmNewPasswordError !== "" && name === "confirmNewPassword") {
      this.state.confirmNewPasswordError = "";
    }
    this.state[name] = value;

    this.setState({});
  };
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  setError = (errorField, field) => {
    console.log("set error being called", this.state[field]);
    this.state[errorField] = `${field} Cannot be empty`;
    this.setState({});
  };
  checkMatch = () => {
    let { newPassword, confirmNewPassword } = this.state;
    if (newPassword !== confirmNewPassword) {
      this.setState({ confirmNewPasswordError: "Passwords do not match" });
      return true;
    } else {
      return false;
    }
  };
  setOldPassword = () => {
    let data = {
      password: this.state.oldPassword,
      newPassword: this.state.newPassword
    };
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${this.props.token}`
    };
    this.setState({ loading: true });
    callApi("post", "v1/auth/changePassword", data, headers)
      .then(result => {
        if (result.data.done) {
          Alert({
            title: "Change Password",
            message: "Your password has been changed successfully",
            buttons: [{ title: "OK", backgroundColor: "#1A5276" }]
          });
          this.setEmpty();
          return false;
        } else {
          this.setState({ oldPasswordError: "current password could not be matched" });
          this.setState({ loading: false });

          return true;
        }
      })
      .catch(err => {
        console.log("error from myProfile Base", err.response, err.status, err);
      });
  };
  checkLength = (errorField, field) => {
    if (this.state[field].length < 6) {
      this.state[errorField] = `Password length should not be less than 6 characters`;
      this.setState({});
      return true;
    } else {
      return false;
    }
  };
  onSave = () => {
    Keyboard.dismiss();
    let { oldPassword, newPassword, confirmNewPassword } = this.state;
    let oldPasswordError, newPasswordError, confirmNewPasswordError;
    oldPasswordError = checkEmpty(oldPassword);
    oldPasswordError && true ? this.setError("oldPasswordError", "Old Password") : "";
    newPasswordError = checkEmpty(newPassword);
    newPasswordError && true ? this.setError("newPasswordError", "New Password") : "";
    confirmNewPasswordError = checkEmpty(confirmNewPassword);
    confirmNewPasswordError && true ? this.setError("confirmNewPasswordError", "Confirm New Password") : "";

    console.log("newpassword error", newPasswordError && false);

    oldPasswordError === false ? (oldPasswordError = this.checkLength("oldPasswordError", "oldPassword")) : "";

    newPasswordError === false ? (newPasswordError = this.checkLength("newPasswordError", "newPassword")) : "";
    confirmNewPasswordError === false ? this.checkLength("confirmNewPasswordError", "confirmNewPassword") : "";

    newPasswordError === false ? (newPasswordError = this.checkMatch()) : "";

    oldPasswordError === false && newPasswordError === false ? this.setOldPassword() : "";
  };
}
