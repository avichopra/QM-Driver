import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from './HistoryBase';
import { connect } from 'react-redux';
import config from '../config/index';
class History extends Base {
	static navigationOptions = {
		drawerLabel: 'History',
		drawerIcon: ({ tintColor }) => (
			// <Image source={require('./chats-icon.png')} style={[ styles.icon, { tintColor: tintColor } ]} />
			<Icon name={'history'} size={25} color={'black'} />
		)
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	render() {
		let historyList = this.state.historyList;
		return (
			<View style={{ flex: 1 }}>
				<Header title={'History'} openDrawer={this.openDrawer} />
				{console.log('before FlatList')}
				<FlatList
					scrollsToTop={true}
					onEndReached={() => {
						this.onEndReached();
					}}
					onEndReachedThreshold={0.01}
					data={historyList}
					keyExtractor={(item, index) => {
						return item._id + Math.random();
					}}
					renderItem={({ item, index }) => {
						console.log('in the render item of lat list', item);
						return (
							<View
								style={{
									height: 200,
									width: '100%',
									marginTop: 20,
									borderBottomWidth: 1,
									borderBottomColor: 'grey',
									marginLeft: 15
								}}
							>
								<View style={{ flexDirection: 'row' }}>
									<Image
										source={{ uri: 'mipmap/amb_history' }}
										style={{ height: 40, width: 40 }}
										resizeMode={'contain'}
									/>
									<Text style={{ fontSize: 20, color: 'black', marginLeft: 20, marginTop: 5 }}>
										Today, 05:21 AM
									</Text>
								</View>

								<View
									style={{
										width: '60%',
										// marginLeft: 70,
										alignItems: 'center',
										height: 22
									}}
								>
									<Text style={{ fontSize: 18, color: 'grey' }} numberOfLines={1}>
										{item.patientId.userId.fullname}
									</Text>

									{/* <View style={{ width: '40%', marginLeft: 8, height: 22 }}> */}
									{/* <Text style={{ fontSize: 18, color: 'grey' }}>{item.driverId.vehicleNo}</Text> */}
									{/* </View> */}
								</View>
								<View style={{ flexDirection: 'row', marginTop: 20 }}>
									<Image
										source={{ uri: 'mipmap/group_3' }}
										style={{ height: 70, width: 30, marginTop: 5 }}
										resizeMode="contain"
									/>
									<View
										style={{
											marginLeft: 25,
											width: '68%',
											marginRight: 3,
											backgroundColor: 'red'
										}}
									>
										<Text style={{ fontSize: 15, color: 'black' }}>{item.driverAddress}</Text>
										<Text style={{ fontSize: 15, color: 'black', marginTop: 10 }}>
											{item.patientAddress}
										</Text>
									</View>
									<View
										style={{
											height: 45,
											width: 45,
											borderRadius: 50,
											alignSelf: 'flex-end',
											marginRight: 30,
											marginBottom: 5,
											borderColor: 'white'
										}}
									>
										<Image
											source={{
												uri: `${config.SERVER_URL}/v1/daffo/file/${item.patientId.userId
													.picture}`
											}}
											style={{ height: 45, width: 45, borderRadius: 50 }}
										/>
									</View>
									{console.warn(
										'Picture>>>>>>>>>>>>>>',
										JSON.stringify(item.patientId.userId, null, 3)
									)}
								</View>
							</View>
						);
					}}
				/>
			</View>
		);
	}
}
function mapStateToProps(state) {
	console.log('I am the stateeeeeeeeeeeeeeeeeeeeeeeeeeee', state);
	return {
		user: state.user,
		token: state.token,
		driver: state.driver
	};
}
export default connect(mapStateToProps)(History);
