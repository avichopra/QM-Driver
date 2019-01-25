import React, { Component, Fragment } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import DrawerItem from '../ReusableComponents/DrawerItem';
import * as Storage from '../utilities/asyncStorage';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Svg, { Path, Ellipse } from 'react-native-svg';
const width = Dimensions.get('window').width;
class DrawerContent extends Component {
  constructor(props) {
    super(props);
  }
  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.closeDrawer();
  };

  onPressLogout = async () => {
    this.props.navigation.closeDrawer();
    await Storage.remove('token');
    await Storage.remove('user');
    this.props.navigation.navigate('Login');
  };
  render() {
    // console.warn('drawer content');
    return (
      <View style={styles.DrawerContent}>
        <View>
          <Svg
            width={'100%'}
            height={200}
            style={{ backgroundColor: 'transparent' }}
          >
            <Ellipse cx={150} cy={45} rx={200} ry={110} fill={'#E8F0FD'} />
          </Svg>
        </View>
        <DrawerItem
          title={'Call Ambulance'}
          navigateToScreen={this.navigateToScreen}
          route={'Home'}
          // icon={<Foundation name={'home'} size={25} color={'#383838'} />
          name={'home'}
        />
        <DrawerItem
          title={'My Profile'}
          navigateToScreen={this.navigateToScreen}
          route={'MyProfile'}
          // icon={<FontAwesome name={'user'} size={25} color={'#383838'} />}
          name={'profile'}
        />
        <DrawerItem
          title={'Change Password'}
          navigateToScreen={this.navigateToScreen}
          route={'ChangePassword'}
          // icon={<Octicons name={'key'} size={25} color={'#383838'} />}
          name={'drawer_key'}
        />
        <DrawerItem
          title={'History'}
          navigateToScreen={this.navigateToScreen}
          route={'History'}
          // icon={<FontAwesome name={'history'} size={25} color={'#383838'} />}
          name={'history'}
        />
        {/* <TouchableOpacity onPress={this.onPressLogout}> */}
        <DrawerItem
          title={'Logout'}
          navigateToScreen={this.onPressLogout}
          route={'Logout'}
          // icon={<FontAwesome name={'history'} size={25} color={'#383838'} />}
          name={'logout'}
        />
        {/* </TouchableOpacity> */}
        <View
          style={{ position: 'absolute', width: '100%', alignItems: 'center' }}
        >
          <View
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              backgroundColor: 'transparent',

              marginTop: 40,
              borderColor: 'white',
              borderWidth: 2
            }}
          />
          <Text style={{ color: 'black' }}>Name</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  DrawerContent: { height: 800, backgroundColor: 'transparent' }
});
export default DrawerContent;
