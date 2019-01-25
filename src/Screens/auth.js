import React, { Component } from 'react';
// import Loading from './../../components/loading';
import { View, Platform, NativeModules } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
// import { callApi } from './../../utilities/serverApi';
// import { getPostCodes } from '../../redux/actions/postcode';
// import { getCategory } from '../../redux/actions/category';
// import { checkLogin } from '../../redux/actions/user';
import firebase from 'react-native-firebase';

// import { connect } from 'react-redux';
// import { DEVICE_DIMENSIONS } from '../../redux/constants';
let height = 0,
	width = 0;
class AuthComponent extends Component {
	componentDidMount() {
		let { dispatch } = this.props;
		// dispatch(getPostCodes());
		// dispatch(getCategory());
		callApi('get', 'user/isLogin').then((data) => {
			if (data.data.email) {
				// if (!data.data.postCode) {
				// 	this.props.navigation.navigate('FacebookPostcode', {
				// 		id: data.data._id
				// 	});
				// } else {
				// 	if (Platform.OS == 'ios') {
				// 		const localNotification = new firebase.notifications.Notification({
				// 			content_available: true
				// 		}).ios.setBadge(data.data.unreadMessage);

				// 		firebase
				// 			.notifications()
				// 			.displayNotification(localNotification)
				// 			.catch((err) => console.error(err));
				// 	} else {
				// 		NativeModules.Device.setBadge(data.data.unreadMessage);
				// 	}
				// this.setState({});
				// dispatch(checkLogin(data.data));
				const resetAction = StackActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({
							routeName: 'DrawerNavigator'

							// params: { user: { ...data.data } }
						})
					]
				});
				this.props.navigation.dispatch(resetAction);
				// }
			} else {
				const resetAction = StackActions.reset({
					index: 0,
					actions: [ NavigationActions.navigate({ routeName: 'Signup' }) ]
				});
				this.props.navigation.dispatch(resetAction);
			}
		});
	}

	registerDimensions = (event) => {
		let { width, height } = event.nativeEvent.layout;
		let { dispatch } = this.props;
		dispatch({
			type: DEVICE_DIMENSIONS,
			payload: { height: height, width: width }
		});
	};
	render() {
		return (
			<View
				style={{ flex: 1 }}
				onLayout={(event) => {
					this.registerDimensions(event);
				}}
			>
				<Loading />
			</View>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.user,
		postCodes: state.postCodes,
		dimension: state.dimension
	};
}

export default connect(mapStateToProps)(AuthComponent);
