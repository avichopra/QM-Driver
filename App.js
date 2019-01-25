import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/store/index';

import Switchnavigator from './src/Screens/routes';
import Modal from './src/ReusableComponents/modal';
export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Modal />
        <Switchnavigator />
      </Provider>
    );
  }
}
