import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import config from '../config/index';
export default class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			cameraClicked = () => {},
			avatarSource = '',
			name = '',
			onHandleChange = () => {},
			fieldValue
		} = this.props;
		return (
			<View
				style={[
					styles.header,
					{
						height: this.props.height ? this.props.height : 50
					}
				]}
			>
				<View style={[ styles.fr, styles.header ]}>
					<TouchableOpacity style={styles.headerIcon}>
						<Icon name="menu" size={25} color={'white'} onPress={this.props.openDrawer} />
					</TouchableOpacity>
					<View style={styles.HText}>
						<Text style={styles.HTitle}>{this.props.title}</Text>
					</View>
				</View>
				{this.props.title === 'My Profile' ? (
					<View>
						{console.log('avataaaar source>>>>>>>?', avatarSource)}
						<View style={[ styles.circle, styles.HImage ]}>
							<Image
								source={{
									uri:
										avatarSource === ''
											? 'asset:/icon/def.png'
											: `${config.SERVER_URL}/v1/daffo/file/${avatarSource}`
								}}
								style={[ styles.circle, styles.circleBorder ]}
							/>
						</View>
						<TouchableOpacity style={styles.cameraContainer} onPress={cameraClicked}>
							<Image source={{ uri: 'mipmap/camera' }} style={styles.cameraIcon} />
						</TouchableOpacity>
						<View style={styles.nameContainer}>
							<TextInput
								style={styles.name}
								onChangeText={(text) => {
									onHandleChange(name, text);
								}}
								value={fieldValue ? fieldValue : null}
								editable={true}
							/>
							<Image style={styles.close} source={{ uri: 'mipmap/close' }} />
						</View>
					</View>
				) : null}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	header: {
		width: '100%',
		backgroundColor: '#2d76d4'
	},
	fr: {
		flexDirection: 'row'
	},
	headerIcon: { height: 30, width: '19%', marginTop: 10, marginLeft: 5 },
	HText: {
		height: 30,
		width: '60%',
		alignItems: 'center',
		marginTop: 10,
		fontFamily: 'Nunito-SemiBold',
		fontSize: 16
	},
	HTitle: { color: 'white', fontSize: 18 },
	circle: {
		height: 95,
		width: 95,
		borderRadius: 50
	},
	circleBorder: {
		borderWidth: 1.5,
		borderColor: 'white'
	},
	HImage: {
		marginTop: 10,
		alignSelf: 'center'
	},
	cameraContainer: {
		height: 35,
		width: 100,
		borderRadius: 50,
		position: 'absolute',
		alignSelf: 'center',
		marginTop: 60,
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},
	cameraIcon: { height: 28, width: 28, borderRadius: 50, resizeMode: 'contain' },
	nameContainer: {
		height: 35,
		width: '70%',
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		alignSelf: 'center',
		flexDirection: 'row'
	},
	name: {
		height: 40,
		width: '95%',
		alignSelf: 'center',
		color: 'white',
		fontSize: 16
	},
	close: { height: 10, width: 10, alignSelf: 'flex-end', marginVertical: 10 }
});
