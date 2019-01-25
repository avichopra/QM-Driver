import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const height = Dimensions.get('window');
const width = Dimensions.get('window');
import TextField from '../ReusableComponents/TextInput';
import ImagePicker from 'react-native-image-picker';
export default class Header extends Component {
	constructor(props) {
		super(props);
	}
	// cameraClicked = () => {
	// 	console.log('avatarrrrrrrrrrrrrrr clicked called>>>>>>>>>>>>>>>>>>>>>>>>>>>');
	// 	const options = {
	// 		title: 'Select Avatar'
	// 		// customButtons: [ { name: 'fb', title: 'Choose Photo from Facebook' } ],
	// 		// storageOptions: {
	// 		// 	skipBackup: true,
	// 		// 	path: 'images'
	// 		// }
	// 	};
	// 	ImagePicker.showImagePicker(options, (response) => {
	// 		console.log('Response = ', response);

	// 		if (response.didCancel) {
	// 			console.log('User cancelled image picker');
	// 		} else if (response.error) {
	// 			console.log('ImagePicker Error: ', response.error);
	// 		} else if (response.customButton) {
	// 			console.log('User tapped custom button: ', response.customButton);
	// 		} else {
	// 			const source = { uri: response.uri };

	// 			// You can also display the image using data:
	// 			// const source = { uri: 'data:image/jpeg;base64,' + response.data };

	// 			this.setState({
	// 				avatarSource: source,
	// 				imageSelected: true
	// 			});
	// 		}
	// 	});
	// };
	render() {
		const { cameraClicked = () => {}, avatarSource = {} } = this.props;
		return (
			// <View style={styles.mainView}>
			<View
				style={[
					{
						width: '100%',
						height: this.props.height ? this.props.height : 50,
						backgroundColor: 'blue'
					}
				]}
			>
				<View
					style={[
						{
							flexDirection: 'row',
							width: '100%',
							// height: this.props.height ? this.props.height : 50,
							backgroundColor: 'blue'
						}
					]}
				>
					<View style={{ height: 30, width: '15%', marginTop: 10, marginLeft: 5 }}>
						<Icon name="menu" size={25} color={'white'} onPress={this.props.openDrawer} />
					</View>
					<View style={{ height: 30, width: '70%', alignItems: 'center', marginTop: 10 }}>
						<Text style={{ color: 'white', fontSize: 18 }}>{this.props.title}</Text>
					</View>
				</View>
				{this.props.title === 'My Profile' ? (
					<View>
						<View
							style={{
								height: 80,
								width: 80,
								borderRadius: 50,
								// backgroundColor: 'coral',
								// position: 'absolute',
								marginTop: 20,
								// borderColor: 'white',
								// borderWidth: 1.5,
								alignSelf: 'center',
								alignItems: 'center'
								// marginTop: 100
							}}
						>
							<Image
								source={avatarSource}
								style={{
									height: 80,
									width: 80,
									borderRadius: 50,
									borderWidth: 1.5,
									borderColor: 'white'

									// backgroundColor: 'coral',
									// position: 'absolute',

									// marginTop: 100
								}}
							/>
						</View>
						<TouchableOpacity
							style={{
								height: 35,
								width: 100,
								borderRadius: 50,
								position: 'absolute',
								alignSelf: 'center',
								marginTop: 60,
								// backgroundColor: 'green',
								alignItems: 'flex-end',
								justifyContent: 'flex-end'
							}}
							onPress={cameraClicked}
						>
							<Image
								source={{ uri: 'mipmap/camera' }}
								style={{ height: 28, width: 28, borderRadius: 50, resizeMode: 'contain' }}
							/>
						</TouchableOpacity>
						<View
							style={{
								height: 35,
								width: '70%',
								borderBottomWidth: 1,
								borderBottomColor: 'white',
								alignSelf: 'center',
								flexDirection: 'row'
							}}
						>
							<TextInput
								style={{
									height: 40,
									width: '95%',
									alignSelf: 'center',
									color: 'white',
									fontSize: 16
								}}
							/>
							<Image
								style={{ height: 10, width: 10, alignSelf: 'flex-end', marginVertical: 10 }}
								source={{ uri: 'mipmap/close' }}
							/>
						</View>
					</View>
				) : null}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	mainView: { height: 40, width: window.width, flexDirection: 'row', backgroundColor: 'blue' }
});
