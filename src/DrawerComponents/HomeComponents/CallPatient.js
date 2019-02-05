import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

export default (AcceptDecline = (props) => {
	const {
		// onBasicSupport = () => {},
		// onAdvancedSupport = () => {},
		// onRequestAmbulance = () => {},
		// advancedSupport = false,
		// basicSupport = false
	} = props;
	return (
		<View
			style={{
				height: 200,
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
					height: 100,
					width: '100%',
					marginTop: 5,
					borderBottomWidth: 0.5,
					borderBottomColor: 'rgba(215,219,221,0.7)'
				}}
			>
				<View style={{ height: 80, width: 80, borderRadius: 50, marginLeft: 5, marginBottom: 5 }}>
					<Image
						source={{ uri: 'mipmap/def' }}
						style={{ height: 80, width: 80, borderRadius: 50 }}
						resizeMode={'contain'}
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
								marginRight: 90
							}}
						>
							Anil Kumar
						</Text>
						<View
							style={{
								height: 30,
								width: '30%',
								backgroundColor: '#76d015',
								borderRadius: 30,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Image
								source={{ uri: 'mipmap/telephone' }}
								style={{ height: 20, width: 20, marginRight: 10 }}
							/>
							<Text style={{ color: 'white', fontFamily: 'NunitoSans-SemiBold', fontSize: 18 }}>
								Call
							</Text>
						</View>
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
							numberOfLines={2}
						>
							Golf Course Road, Sector 29, Gurgaon
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
			<View style={{ marginLeft: 25, flexDirection: 'row' }}>
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
					+91 1234567891
				</Text>
			</View>
		</View>
	);
});
