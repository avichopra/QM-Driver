import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import Textinput from "../../component/CustomComponent/Textinput";
import style from "../../styles/index";
import SplashScreen from "react-native-splash-screen";
import Base from "./resetBase";
export default class Reset extends Base {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailerror: "",
      loading: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <ImageBackground
            source={{ uri: "asset:/icon/group_2.png" }}
            style={[style.d1]}
            resizeMode={"stretch"}
          >
            <View>
              <View style={style.d3}>
                <Image
                  source={{ uri: "asset:/icon/lock_1.png" }}
                  style={{ width: 50, height: 70, alignSelf: "center" }}
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={[style.i1, style.a1]}>Forget Password</Text>
              </View>
              <View style={{ flexGrow: 0.5 }}>
                <Text style={[style.i1, { fontSize: 12, alignSelf: "center" }]}>
                  We just need your registered e-mail address to
                </Text>

                <Text
                  style={[
                    style.i1,
                    style.a1,
                    { fontSize: 12, alignSelf: "center" }
                  ]}
                >
                  send you password reset link
                </Text>
              </View>
              <View style={style.d4}>
                <Image
                  source={{ uri: "asset:/icon/mail_copy.png" }}
                  style={{ width: 40, height: 20, marginVertical: 30 }}
                  resizeMode="contain"
                />

                <View style={style.f3}>
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
              <View style={[style.f1, style.j1]}>
                <View style={style.d7}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13
                    }}
                  >
                    I have an account?&nbsp;
                  </Text>
                  <Text
                    style={{ fontSize: 15, color: "white" }}
                    onPress={() => {
                      this.props.navigation.navigate("Login");
                    }}
                  >
                    Sign In
                  </Text>
                </View>
                {this.state.loading === false ? (
                  <TouchableOpacity style={style.c2} onPress={this.onSubmit}>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        fontSize: 14,
                        color: "#2948ff"
                      }}
                    >
                      Reset Password
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={style.c2}>
                    <ActivityIndicator size="large" color="#000" />
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
