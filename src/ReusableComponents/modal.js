import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import Events from 'react-native-simple-events';

// import { Image } from '../components';

import Icon from 'react-native-vector-icons/MaterialIcons';

// import { isFunction, TOTAL_TOOLBAR_HEIGHT, LOG, playDopSound } from '../utilities';

// import TempStorage from '../utilities/tempStorage';

export function Alert(data = {}) {
	let {
		emotion = 'normal',

		title = 'Alert',

		message = 'Your custom message',

		buttons = [
			{
				title: 'CANCEL',

				onPress: () => {},

				icon: false,

				backgroundColor: 'blue'
			},

			{
				title: 'OK',

				onPress: () => {},

				icon: false,

				backgroundColor: 'blue'
			}
		],

		...otherProps
	} = data;

	Events.trigger('showAlert', {
		message,

		title,

		buttons,

		emotion,

		...otherProps
	});
}

export default class ModalView extends Component {
	constructor(props) {
		super(props);

		let { title = false, message = false, buttons = false, show = false, emotion = false } = props || {};

		this.state = {
			title: title || 'Alert',

			message: message || 'Your custom message',

			buttons: buttons || [
				{
					title: 'CANCEL',

					onPress: () => {},

					icon: false,

					backgroundColor: '#1A5276'
				},

				{
					title: 'OK',

					onPress: () => {},

					icon: false,

					backgroundColor: '#1A5276'
				}
			],

			show: show,

			emotion: emotion || 'normal'
		};
	}

	componentWillMount() {
		let { id = null } = this.props;

		Events.on('showAlert', id ? id : '123456789', this.onRequest);

		Events.on('upDateAlert', id ? id : '123456789', this.upDateAlert);
	}

	componentWillUnmount() {
		let { id = null } = this.props;

		Events.remove('showAlert', id ? id : '123456789');

		Events.remove('upDateAlert', id ? id : '123456789');
	}

	onRequest = (options) => {
		let { message, title, show = true, buttons = [], emotion = 'normal' } = options;

		if (message) {
			this.setState({ title, message, buttons, show, emotion });
		}
	};

	upDateAlert = (options) => {
		this.setState({ ...options });
	};

	closeModal = () => {
		this.setState({ show: false });
	};

	render() {
		let { backgroundColor, animationType } = this.props;

		let { title, message, buttons, show, emotion = 'normal' } = this.state;

		const height = Dimensions.get('window').height;

		let alertGuy = [ 'angry', 'confused', 'happy', 'normal', 'sad', 'surprized' ].includes(emotion)
			? `icon_guy_${emotion}`
			: 'icon_guy_normal';

		return (
			<Modal transparent visible={show} animationType={animationType || 'fade'} onRequestClose={this.closeModal}>
				<TouchableWithoutFeedback>
					<View
						style={{
							height: height,
							backgroundColor: 'rgba(128,128,128,0.9)',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<View
							style={[
								{
									// borderWidth: 5,
									// borderColor: 'grey',
									// elevation: 10,
									borderRadius:15,
									width: '90%',

									height: height - 200,

									backgroundColor: '#FDFEFE'
								}
							]}
						>
							<View
								style={{
									// elevation: 24,

									// shadowColor: "#000",

									// shadowOffset: { height: 12, width: 6 },

									// shadowRadius: 12,

									// shadowOpacity: 0.5,

									justifyContent: 'center',

									alignItems: 'center',
									padding: 0,
									margin: 0,
									flex: 1
								}}
							>
								<View style={{ height: 50 }} />
								<View style={{ padding: 24, flex: 1 }}>
									<View style={{ flex: 0.5 }} />
									<View style={{ justifyContent: 'center', alignItems: 'center' }}>
										{/* <Image
										source={{ uri: alertGuy }}
										style={{
											height: 96,
											width: 96,
											borderRadius: 48,
											borderWidth: 0.5,
											borderColor: '#ccc'
										}}
									/> */}
									</View>

									{/* -------------------------- Title --------------------------------- */}
									<View
										style={{
											justifyContent: 'center',
											alignItems: 'center',
											flex: 1,
											marginBottom: 40
										}}
									>
										<Text style={[ { textAlign: 'center', color: 'grey', fontSize: 25 } ]}>
											{title}
										</Text>
									</View>
									{/* -------------------------- message --------------------------------- */}
									<View style={{ flex: 4 }}>
										<Text
											style={{
												color: '#616161',
												fontSize: 20,
												fontFamily: 'Roboto-Regular',
												lineHeight: 24,
												paddingHorizontal: 24,
												textAlign: 'center'
											}}
										>
											{message}
										</Text>
									</View>
								</View>
							</View>

							{/* -------------------------- Actions --------------------------------- */}
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									paddingVertical: 8,
									marginHorizontal: 24,
									marginBottom: 46
									// backgroundColor: 'blue'
								}}
							>
								{buttons.map(
									(button, index) =>
										button.icon ? (
											<TouchableHighlight
												key={index}
												activeOpacity={0.7}
												style={{
													width: 60,
													height: 60,
													borderRadius: 20,
													marginHorizontal: 8,
													marginBottom: 8,
													justifyContent: 'center',
													alignItems: 'center',
													backgroundColor: '#21618C',
													borderRadius:20
												}}
												onPress={() => {
													this.closeModal();
												}}
											>
												<Icon size={24} name={button.icon} color={'#fff'} />
											</TouchableHighlight>
										) : (
											<TouchableHighlight
												key={index}
												// underlayColor={'#e6e6e6'}
												onPress={() => {
													button.onPress ? button.onPress() : {};
													this.closeModal();
												}}
												style={{
													height: 40,
													minWidth: 70,
													paddingHorizontal: 10,
													justifyContent: 'center',
													marginRight: 8,
													alignItems: 'center',
													backgroundColor: '#21618C',
													borderRadius:20
												}}
											>
												<View>
													<Text
														style={{
															color: 'white',
															fontSize: 18
														}}
													>
														{button.title}
													</Text>
												</View>
											</TouchableHighlight>
										)
								)}
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}
