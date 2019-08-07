import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  Linking,
  AppState,
  KeyboardAvoidingView,
  ActivityIndicator,
  StatusBar
} from "react-native";
import Textinput from "../../component/CustomComponent/Textinput";
import style from "../../styles/index";
import Base from "./LoginBase";
export default class Login extends Base {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailerror: "",
      passworderror: "",
      loading: false
    };
  }
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={style.f1} keyboardShouldPersistTaps="always">
          <ImageBackground source={{ uri: "asset:/icon/group_2.png" }} style={style.d1} resizeMode={"stretch"}>
            <View style={style.f1}>
              <Image source={{ uri: "asset:/icon/group.jpg" }} style={[style.d2, style.a1, { marginTop: 30 }]} />
              <Text
                style={{
                  alignSelf: "center",
                  color: "#ffffff",
                  fontSize: 11,
                  fontFamily: "NunitoSans-Regular"
                }}
              >
                Driver App
              </Text>
            </View>

            <View style={style.f1}>
              <View style={style.d4}>
                <Image source={{ uri: "asset:/icon/mail_copy.png" }} style={style.d5} resizeMode="contain" />

                <View style={style.f8}>
                  <Textinput
                    onChangeText={text => {
                      this.ChangeText(text, "email");
                    }}
                    value={this.state.email}
                    autoCapitalize="none"
                  >
                    Email
                  </Textinput>
                </View>
              </View>
              <Text style={style.c1}>{this.state.emailerror}</Text>
              <View style={style.d4}>
                <Image source={{ uri: "asset:/icon/lock.png" }} style={[style.d6, style.d3]} resizeMode="contain" />

                <View style={style.f3}>
                  <Textinput
                    secureTextEntry={true}
                    onChangeText={text => {
                      this.ChangeText(text, "password");
                    }}
                    value={this.state.password}
                    autoCapitalize="none"
                  >
                    Password
                  </Textinput>
                </View>

                <Text
                  style={{ fontSize: 12, color: "white", marginVertical: 20 }}
                  onPress={() => {
                    this.props.navigation.navigate("Reset");
                  }}
                >
                  Forgot Password?
                </Text>
              </View>
              <Text style={style.c1}>{this.state.passworderror}</Text>
            </View>
            <View style={[style.j1, style.f1]}>
              {this.state.loading === false ? (
                <TouchableOpacity style={style.c2} onPress={this.onSubmit} accessible={false}>
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 13,
                      fontSize: 14,
                      color: "#2948ff",
                      fontFamily: "Nunito Bold"
                    }}
                  >
                    SIGN IN
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={style.c2}>
                  <ActivityIndicator size="large" color="#000" />
                </View>
              )}
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
