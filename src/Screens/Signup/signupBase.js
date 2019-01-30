import React, { Component } from 'react';
import axios from 'axios';
// import { Alert } from '../../ReusableComponents/modal';
import {
  checkField,
  isValidEmail,
  isValidContactnumber,
  isValidPassword,
  isValidConfirmPassword
} from '../../utilities/validation';
import {Keyboard} from "react-native"
import { callApi } from '../../utilities/serverApi';
import { Alert } from '../../ReusableComponents/modal';
export default class signupBase extends Component {
  constructor() {
    super();
    this.state = {
      FullName: '',
      Email: '',
      contactnumber: '',
      emergencycontactnumber: '',
      password: '',
      confirmpassword: '',
      fullnameerror: '',
      emailerror: '',
      contacterror: '',
      emergencycontacterror: '',
      passworderror: '',
      confirmpassworderror: '',
      modalVisible: false,
      loading:false
    };
  }
  checkAllMandatoryField = () => {
    var fullname = checkField('Fullname', this.state.FullName.trim());
    var email = isValidEmail(this.state.Email.trim());
    var contactnumber = isValidContactnumber(this.state.contactnumber.trim());
    var emergencycontactnumber = isValidContactnumber(this.state.emergencycontactnumber.trim());
    var password = isValidPassword(this.state.password.trim());
    var confirmpassword = isValidConfirmPassword(this.state.password.trim(), this.state.confirmpassword.trim());

    console.log(fullname, email, contactnumber, emergencycontactnumber, password, confirmpassword);
    if (email === false) email = 'Enter Valid Email id';
    this.setState({
      fullnameerror: fullname,
      emailerror: email,
      contacterror: contactnumber,
      emergencycontacterror: emergencycontactnumber,
      passworderror: password,
      confirmpassworderror: confirmpassword
    });
    if (
      fullname === true &&
      email === true &&
      contactnumber === true &&
      emergencycontactnumber === true &&
      password === true &&
      confirmpassword === true
    ) {
      return true;
    }
    return false;
  };
  ChangeText = async (text, name) => {
    await this.setState({ [name]: text });
    if (name === 'FullName') {
      let fullname = checkField(name, this.state.FullName.trim());
      this.setState({ fullnameerror: fullname });
    } else if (name === 'Email') {
      let email = checkField(name, this.state.Email.trim());
      this.setState({ emailerror: email });
    } else if (name === 'contactnumber') {
      let contactnumber = checkField('ContactNumber', this.state.contactnumber.trim());
      this.setState({ contacterror: contactnumber });
    } else if (name === 'emergencycontactnumber') {
      let emergencycontactnumber = checkField('Emergency Contact Number', this.state.emergencycontactnumber.trim());
      this.setState({ emergencycontacterror: emergencycontactnumber });
    } else if (name === 'password') {
      let password = checkField('Password', this.state.password.trim());
      this.setState({ passworderror: password });
    } else if (name === 'confirmpassword') {
      let confirmpassword = checkField('ConfirmPassword', this.state.confirmpassword.trim());
      this.setState({ confirmpassworderror: confirmpassword });
    }
  };
  onSubmit = () => {
    if (this.checkAllMandatoryField()) {
      this.setState({loading:true})
      let data = {
        fullname: this.state.FullName.trim(),
        email: this.state.Email.trim(),
        contactNo: this.state.contactnumber.trim(),
        emergencycontactnumber: this.state.emergencycontactnumber.trim(),
        password: this.state.password.trim(),
        role: 'Patient'
      };
      callApi('post', 'v1/auth/register', data)
        .then(response => {
          if (response.status === 201) {
            this.setState({FullName:"",Email:"",contactnumber:"",emergencycontactnumber:"",password:"",confirmpassword:"",loading:false})
            Alert({ message: 'Verification link has been sent to your email' ,	buttons: [
              {
                title: 'Ok',
                icon: false,
                backgroundColor: 'blue'
              }
            ]});

            // alert('Verification link has been sent to your email');
          }
          // console.log(response);
        })
        .catch(error => {
          this.setState({loading:false,FullName:"",Email:"",contactnumber:"",emergencycontactnumber:"",password:"",confirmpassword:"",emailerror:"Email already exist"})
          console.log(error.response);
        });
    } else {
      console.log('error');
    }
  };
  componentDidMount() {
    Keyboard.dismiss();
  }
}
