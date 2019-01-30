import { Component } from 'react';
import { isValidEmail, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { Alert } from '../../ReusableComponents/modal';
export default class resetBase extends Component {
  checkAllMandatoryField = () => {
    var email = isValidEmail(this.state.email);

    console.log(email);
    if (email === false) email = 'Enter Valid Email id';
    this.setState({
      emailerror: email
    });
    if (email === true) {
      return true;
    }
    return false;
  };
  ChangeText = async (text, name) => {
    await this.setState({ [name]: text });
    if (name === 'email') {
      let email = checkField('Email', this.state.email.trim());
      this.setState({ emailerror: email });
    }
  };
  onSubmit = () => {
    if (this.checkAllMandatoryField()) {
      this.setState({loading:true})
      let data = {
        email: this.state.email
      };
      callApi('post', 'v1/auth/forget', data)
        .then(response => {
          if (response.status === 200) {
            this.setState({email:"",loading:false})
            Alert({
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
=======
              title: 'Reset Password',
>>>>>>>  changes app icon login rest
              message: 'Password reset link has been sent to your email',	buttons: [
								{
									title: 'Ok',
									icon: false,
									backgroundColor: 'blue'
								}
							]
            });
            console.log('response', response);
            // alert('Password Reset Link has been sent to your email');
          }
          // console.log(response);
        })
        .catch(error => {
          if (error.response.data.code === 400) {
            this.setState({ emailerror: 'user not found',loading:false });
          }
          console.log('Error', error.response.data);
        });
    } else {
      console.log('error');
    }
  };
}
