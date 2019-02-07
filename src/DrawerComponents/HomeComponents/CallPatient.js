import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import config from '../../config/index';
export default (AcceptDecline = (props) => {
	const {
		location = { currentPlace: '', longitude: '', latitude: '' },

		patient = { name: '', address: '', picture: 'public/1549363727367.JPEG', emergencycontactnumber },
		Call = () => {}
	} = props;
	return (
		<View
			style={{
				height: 250,
				width: '100%',
				backgroundColor: 'white',
				position: 'absolute',
				bottom: 0,
				borderBottomWidth: 1
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					height: 150,
					width: '100%',
					marginTop: 5,
					borderBottomWidth: 0.5,
					borderBottomColor: 'rgba(215,219,221,0.7)'
				}}
			>
				<View style={{ height: 80, width: 80, borderRadius: 50, marginLeft: 5, marginBottom: 45 }}>
					<Image
						source={{ uri: `${config.SERVER_URL}/v1/daffo/file/${patient.picture}` }}
						style={{ height: 80, width: 80, borderRadius: 50 }}
						// resizeMode={'contain'}
					/>
				</View>
				<View>
					<View
						style={{
							flexDirection: 'row',
							width: '90%'
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontFamily: 'NunitoSans-SemiBold',
								color: 'black',
								marginLeft: 25,
								marginBottom: 8,
								marginRight: 40,
								width: '50%'
							}}
							numberOfLines={1}
						>
							{patient.name}
						</Text>
						<TouchableOpacity
							style={{
								height: 30,
								width: '30%',
								backgroundColor: '#76d015',
								borderRadius: 30,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center'
							}}
							onPress={() => Call('CN')}
						>
							<Image
								source={{ uri: 'mipmap/telephone' }}
								style={{ height: 20, width: 20, marginRight: 10 }}
							/>
							<Text style={{ color: 'white', fontFamily: 'NunitoSans-SemiBold', fontSize: 18 }}>
								Call
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: 'row', marginLeft: 20, width: '75%' }}>
						<Image
							source={{ uri: 'mipmap/map' }}
							style={{ width: 20, height: 20, marginRight: 3, marginTop: 2 }}
							resizeMode={'contain'}
						/>
						<Text
							style={{
								color: 'grey',
								fontFamily: 'NunitoSans-Regular',
								fontSize: 18,
								marginBottom: 5
							}}
							numberOfLines={4}
						>
							{location ? location.currentPlace : ''}
						</Text>
					</View>
				</View>
			</View>
			<Text
				style={{
					color: 'black',
					fontFamily: 'NunitoSans-SemiBold',
					fontSize: 20,
					marginLeft: 25,
					marginTop: 10,
					marginBottom: 10
				}}
			>
				Emergency Contact No.
			</Text>
			<TouchableOpacity style={{ marginLeft: 25, flexDirection: 'row' }} onPress={() => Call('ECN')}>
				<Image source={{ uri: 'mipmap/call_answer_blue' }} style={{ height: 20, width: 20, marginTop: 3 }} />
				<Text
					style={{
						fontSize: 20,
						marginLeft: 15,
						letterSpacing: 0.5,
						fontFamily: 'NunitoSans-Regular',
						color: '#777777'
					}}
				>
					{patient.emergencyContactNo}
				</Text>
			</TouchableOpacity>
		</View>
	);
});
