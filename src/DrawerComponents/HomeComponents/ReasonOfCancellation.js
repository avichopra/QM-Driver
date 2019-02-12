import React, { Component } from 'react';
import { Text, View, Modal, Alert, TouchableOpacity, Dimensions } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
const height = Dimensions.get('window').height;
// import { Alert } from '../../ReusableComponents/modal';
import { Reasons } from '../../config/constants';

export default class ReasonOfCancellation extends Component {
	constructor(props) {
		super(props);
		this.state = { selectedReason: '' };
	}
	onSelect = (value) => {
		this.setState({ selectedReason: value });
	};
	render() {
		let { onShowReasons = () => {}, onSubmit = () => {} } = this.props;
		return (
			// <Modal visible={true} transparent={true} onRequestClose={() => Alert.alert('Modal closed')}>
			<View
				style={{
					// height: height,
					flex: 1,
					backgroundColor: 'rgba(128,128,128,0.9)',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%'
				}}
			>
				<View
					style={{
						height: height - 100,
						width: '90%',
						backgroundColor: 'white',
						alignItems: 'center',
						borderWidth: 1,
						borderColor: 'rgba(128,128,128,0.9)',
						elevation: 3,

						justifyContent: 'space-between'
					}}
				>
					<View
						style={{
							// alignSelf: 'center',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							marginTop: 20
							// marginVertical: 50
						}}
					>
						<Text
							style={{
								fontSize: 20,

								color: '#34495E'
							}}
						>
							Reason for cancellation
						</Text>
					</View>
					<ModalDropdown
						options={Reasons}
						onSelect={(index, value) => {
							this.onSelect(value);
						}}
						dropdownStyle={{ width: 250, height: 90, backgroundColor: '#34495E', borderRadius: 20 }}
						dropdownTextStyle={{
							color: '#FBFCFC',
							fontSize: 15,
							backgroundColor: '#34495E'
						}}
						dropdownTextHighlightStyle={{ backgroundColor: '#34495E' }}
					>
						<View
							style={{
								height: 40,
								width: 250,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#AAB7B8'

								// backgroundColor: 'blue'
							}}
						>
							<Text
								style={{
									// width: '100%',
									fontSize: 20
								}}
							>
								Select The Reason.....
							</Text>
						</View>
					</ModalDropdown>
					<View
						style={{
							width: '100%',
							height: 30,
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: 50
						}}
					>
						<Text style={{ color: '#5D6D7E', fontSize: 18 }} textBreakStrategy="balanced">
							{this.state.selectedReason}
						</Text>
					</View>
					<View style={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}>
						<TouchableOpacity
							style={{
								height: 35,
								width: '40%',
								backgroundColor: '#AAB7B8',
								borderRadius: 20,
								alignItems: 'center',
								justifyContent: 'center',
								// marginVertical: 20,
								marginBottom: 10
							}}
							onPress={() => onShowReasons(false)}
						>
							<Text>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								height: 35,
								width: '40%',
								backgroundColor: '#AAB7B8',
								borderRadius: 20,
								alignItems: 'center',
								justifyContent: 'center',
								marginBottom: 30
								// marginVertical: 20
							}}
							onPress={() => onSubmit(this.state.selectedReason)}
						>
							<Text>Submit</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			// </Modal>
		);
	}
}
