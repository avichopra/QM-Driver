import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import config from '../../config/index';
export default (AcceptDecline = (props) => {
	const {
		onAccept = () => {},
		patient = { name: '', address: '', picture: 'public/1549363727367.JPEG' },
		location = { currentPlace: '', longitude: '', latitude: '' }
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
				borderBottomWidth: 1,
				borderBottomColor: 'rgba(215,219,221,0.7)'
			}}
		>
			{console.log('patient>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', patient)}
			<View style={{ flexDirection: 'row', height: 60 }}>
				<TouchableOpacity
					style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}
					onPress={onAccept}
				>
					<Text style={{ color: '#6fd10d', fontFamily: 'Nunito-Regular', fontSize: 20 }}>ACCEPT</Text>
				</TouchableOpacity>
				<View
					style={{
						height: 45,
						width: 0.5,
						backgroundColor: 'rgba(215,219,221,0.7)',
						alignSelf: 'center',
						justifyContent: 'center'
					}}
				/>
				<TouchableOpacity style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ color: '#f80321', fontFamily: 'Nunito-Regular', fontSize: 20 }}>REJECT</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					height: 0.5,
					backgroundColor: 'rgba(215,219,221,0.7)',
					width: '100%',
					marginBottom: 5
				}}
			/>
			<View style={{ flexDirection: 'row', alignItems: 'center', height: 109, width: '100%' }}>
				<View
					style={{
						height: 80,
						width: 80,
						borderRadius: 50,
						marginLeft: 5,
						marginBottom: 5
					}}
				>
					<Image
						source={{ uri: `${config.SERVER_URL}/v1/daffo/file/${patient.picture}` }}
						style={{
							height: 80,
							width: 80,
							borderRadius: 50
						}}
					/>
				</View>
				<View style={{ width: '100%' }}>
					<Text
						style={{
							fontSize: 20,
							fontFamily: 'NunitoSans-SemiBold',
							color: 'black',
							marginLeft: 25,
							marginBottom: 8,
							width: '50%'
						}}
						numberOfLines={1}
					>
						{patient.name}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							marginLeft: 20,
							width: '80%'
						}}
					>
						<Image
							source={{ uri: 'mipmap/map' }}
							style={{ width: 20, height: 20, marginRight: 3, marginTop: 2 }}
							resizeMode={'contain'}
						/>
						<Text
							style={{
								color: '#777777',
								fontFamily: 'NunitoSans-Regular',
								fontSize: 18,
								marginBottom: 3,
								width: '85%'
							}}
							numberOfLines={3}
						>
							{/* {patient.address}
						 */}
							{/* {console.warn('acceptDecline', JSON.stringify(location, null, 3))} */}
							{location ? location.currentPlace : ''}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
});
