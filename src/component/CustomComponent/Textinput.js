import FloatingLabel from 'react-native-floating-labels';
import React, { Component } from 'react';
export default class Textinput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { ...props } = this.props;
    return (
      <FloatingLabel
        labelStyle={{
          color: 'white',
          fontSize: 14,
          fontFamily: 'Nunito-Bold'
        }}
        inputStyle={{
          borderWidth: 0,
          fontSize: 14,
          color: 'white',
          fontFamily: 'Nunito Regular'
        }}
        
        {...props}
      />
    );
  }
}
