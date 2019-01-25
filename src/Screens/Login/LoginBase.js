import React, { Component } from 'react';
import { isValidEmail, isValidPassword, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser } from '../../redux/index';
import { Alert } from '../../ReusableComponents/modal';
import { get } from 'lodash';
export default class LoginBase extends Component {
  constructor(props) {
    super(props);
  }

  ChangeText = async (text, name) => {
    await this.setState({ [name]: text });
    if (name === 'email') {
      let email = checkField(name, this.state.email.trim());
      this.setState({ emailerror: email });
    } else if (name === 'password') {
      let password = checkField(name, this.state.password.trim());
      this.setState({ passworderror: password });
    }
  };
  checkAllField = () => {
    console.log(this.state.email);
    var email = isValidEmail(this.state.email.trim());
    var password = isValidPassword(this.state.password.trim());
    console.log(email, password);
    if (email === false) email = 'Enter Valid Email id';
    this.setState({
      emailerror: email,
      passworderror: password
    });
    if (email === true && password === true) {
      return true;
    }
    return false;
  };
  sendVerifationEmail = () => {
    let data = {
      email: this.state.email
    };
    callApi('post', 'v1/daffo/dispatch/resentVerificationEmail', data)
      .then(response => {
        console.log('Response in resend', response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  onSubmit = () => {
    const { navigate } = this.props.navigation;
    if (this.checkAllField()) {
      let data = {
        email: this.state.email,
        password: this.state.password
      };
      callApi('post', 'v1/auth/login', data)
        .then(response => {
          console.log('user details', response);
          setUser(response.data.user);
          setUserToken(response.data.token.accessToken);
          navigate('Drawer');
          console.log('token set');
        })
        .catch(error => {
          console.log('Error---->', error.response);
          if (error.response.data.message === 'Incorrect email') this.setState({ emailerror: 'Incorrect email' });
          else if (error.response.data.message === 'Incorrect password')
            this.setState({ passworderror: 'Incorrect password' });
          else if (!error.response.data.message.emailVerified) {
            console.log('inside verify modal');
            Alert({
              message: 'Verify your email',

              buttons: [
                {
                  title: 'Cancel',

                  icon: false,
                  backgroundColor: 'blue'
                },
                {
                  title: 'Send Verification Email',
                  onPress: this.sendVerifationEmail,
                  icon: false,
                  backgroundColor: 'blue'
                }
              ]
            });
          } else if (!error.response.data.message.phoneVerified)
            navigate('OTP', { email: error.response.data.message.email });
        });
    } else {
      console.log('error in validation');
    }
  };
  componentDidMount() {}
}
