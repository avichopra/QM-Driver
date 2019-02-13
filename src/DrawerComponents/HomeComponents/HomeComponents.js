import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import config from '../../config/index';
import styles, { Palette } from '../../styles/index';
const Calls = () => {
	return (
		<TouchableOpacity style={[ styles.center, styles.call ]} onPress={() => Call('CN')}>
			<Image source={{ uri: 'mipmap/telephone' }} style={[ styles.icon19, { marginRight: 10 } ]} />
			<Text style={[ styles.f18, styles.bold, { color: 'white' } ]}>Call</Text>
		</TouchableOpacity>
	);
};
export const CallPatient = (props) => {
	const {
		location = { currentPlace: 'Golf Course Road, Sector 29, Gurgaon', longitude: '', latitude: '' },

		patient = {
			name: 'Anil Kumar',
			address: '',
			picture: 'public/1549363727367.JPEG',
			emergencyContactNo: '123456789'
		},
		Call = () => {}
	} = props;
	return (
		<View style={[ styles.wbg, styles.h250 ]}>
			<View
				style={[
					styles.fr,
					styles.h150,
					{
						width: '98%',
						alignSelf: 'center',
						borderBottomWidth: 0.5,
						borderBottomColor: 'rgba(215,219,221,0.7)'
					}
				]}
			>
				<View style={[ styles.circle70, { marginLeft: 5, marginBottom: 45 } ]}>
					<Image
						source={{ uri: `${config.SERVER_URL}/v1/daffo/file/${patient.picture}` }}
						style={[ styles.circle70 ]}
					/>
				</View>
				<View>
					<View
						style={{
							flexDirection: 'row',
							width: '80%',
							justifyContent: 'space-between'
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontFamily: 'NunitoSans-SemiBold',
								color: 'black',
								marginLeft: 10,
								marginBottom: 8,
								// marginRight: 45,
								width: '50%'
							}}
							numberOfLines={1}
						>
							{patient.name}
						</Text>
						<Calls />
					</View>
					<View style={{ flexDirection: 'row', marginLeft: 20, width: '80%' }}>
						<Image
							source={{ uri: 'mipmap/map' }}
							style={[ styles.icon19, { marginRight: 3, marginTop: 2 } ]}
							resizeMode={'contain'}
						/>
						<Text
							style={{
								color: 'grey',
								fontFamily: 'NunitoSans-Regular',
								fontSize: 18,
								marginBottom: 5,
								width: '90%'
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
					fontSize: 19,
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
};
export const AcceptDecline = (props) => {
	const {
		onAccept = () => {},
		onReject = () => {},
		patient = { name: 'Anil Kumar', address: 'Golf Course Road, Sector 29', picture: 'public/1549363727367.JPEG' },
		location = { currentPlace: 'Golf Course Road, Sector 29, Gurgaon', longitude: '', latitude: '' }
	} = props;
	return (
		<View
			style={[
				styles.wbg,
				{
					height: 200,
					borderBottomWidth: 1,
					borderBottomColor: 'rgba(215,219,221,0.7)',
					alignItems: 'center'
				}
			]}
		>
			<View style={{ flexDirection: 'row', height: 60, width: '100%' }}>
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
						alignSelf: 'center'
					}}
				/>
				<TouchableOpacity
					style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}
					onPress={onReject}
				>
					<Text style={{ color: '#f80321', fontFamily: 'Nunito-Regular', fontSize: 20 }}>REJECT</Text>
				</TouchableOpacity>
			</View>
			<View style={[ styles.divider, styles.mb5 ]} />
			<View
				style={[
					styles.fr,
					{
						alignItems: 'center',
						height: 109,
						width: '98%'
					}
				]}
			>
				<View style={[ styles.circle70, styles.ml5, styles.mb5 ]}>
					<Image
						source={{ uri: `${config.SERVER_URL}/v1/daffo/file/${patient.picture}` }}
						style={[ styles.circle70 ]}
					/>
				</View>
				<View style={{ width: '75%' }}>
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
							width: '100%'
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
};
export const PickedPatient = (props) => {
	return (
		<View style={[ styles.h200, styles.wbg ]}>
			<View
				style={[
					styles.fr,
					{
						height: 80,
						width: '95%',
						alignItems: 'center'
					}
				]}
			>
				<View style={[ styles.circle50, { marginRight: 15 } ]}>
					<Image
						source={{ uri: `http://192.168.100.141:3000/v1/daffo/file/public/1549363727367.JPEG` }}
						style={[ styles.circle50 ]}
					/>
				</View>

				<Text style={{ fontSize: 18, color: 'black' }}>Anil Kumar</Text>
			</View>
			<View style={styles.divider} />

			{/* <View style={[ styles.center, { height: 100 } ]}>
				<Button title={'Picked Up Patient'} backgroundCol
				or={Palette.hB} />
			</View> */}
			<View
				style={[
					styles.frSelf,
					{
						marginTop: 10,
						width: '96%'
					}
				]}
			>
				<View style={{ marginLeft: 5, height: 50, width: 50, marginTop: 10 }}>
					<Image source={{ uri: `mipmap/hospital` }} style={{ height: 50, width: 50 }} resizeMode="contain" />
				</View>

				<View style={{ width: '62%', marginTop: 10, marginLeft: 10 }}>
					<Text
						style={{
							fontSize: 18,
							fontFamily: 'NunitoSans-SemiBold',
							color: 'black',
							marginBottom: 5,
							// marginRight: 45,
							width: '96%'
						}}
						numberOfLines={1}
					>
						Fortris Hospital
					</Text>
					<Text style={{ fontSize: 18, color: 'grey', width: '98%', fontFamily: 'NunitoSans-SemiBold' }}>
						Sector 30, Gurgaon
					</Text>
				</View>
				<Calls />
			</View>
		</View>
	);
};
