import React, { Component } from 'react';
import { isValidConfirmPassword, isValidPassword, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser } from '../../redux/index';
import { get } from 'lodash';
import { Alert } from '../../ReusableComponents/modal';
export default class LoginBase extends Component {
  constructor(props) {
    super(props);
  }
  ChangeText = async (text, name) => {
    await this.setState({ [name]: text });
    if (name === 'password') {
      let password = checkField('Password', this.state.password.trim());
      this.setState({ passworderror: password });
    } else if (name === 'confirmpassword') {
      let cnfpassword = checkField('Confirm Password', this.state.confirmpassword.trim());
      this.setState({ confirmpassworderror: cnfpassword });
    }
  };
  checkAllField = () => {
    console.log(this.state.email);
    var password = isValidPassword(this.state.password);
    var confirmpassword = isValidConfirmPassword(this.state.password, this.state.confirmpassword);
    // console.log(email, password);
    // if (email === false) email = 'Enter Valid Email id';
    this.setState({
      passworderror: password,
      confirmpassworderror: confirmpassword
    });
    if (password === true && confirmpassword === true) {
      return true;
    }
    return false;
  };
  onSubmit = () => {
    // const { navigate } = this.props.navigation;
    if (this.checkAllField()) {
      let data = {
        email: this.state.email,
        resetPasswordToken: this.state.token,
        password: this.state.password
      };
      callApi('post', 'v1/auth/resetPassword', data)
        .then(response => {
          if (response.status === 200) Alert({ message: 'Password Reset successfully' });
          this.props.navigation.navigate('Login');
        })
        .catch(error => {
          console.log(error.response);
        });
    } else {
      console.log('error in validation');
    }
  };
  componentDidMount() {}
}
