// import { Button } from "react-native-elements";
// import styles from "./../style";
import React, { Fragment } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Loading from '../ReusableComponents/loading';
export default (Button = (props) => {
	const {
		onPress = () => {},
		title = 'title',
		disabled = false,
		style = {},
		backgroundColor = '',
		styleTitle = {},
		loading = false,
		onSave = () => {}
	} = props;
	return (
		<View style={{ width: '100%', alignItems: 'center' }}>
			{loading ? (
				<Loading backgroundColor={backgroundColor} />
			) : (
				<TouchableOpacity
					disabled={disabled}
					style={[
						{
							height: 45,
							width: '70%',
							borderRadius: 22.5,
							backgroundColor: backgroundColor,
							alignItems: 'center',
							justifyContent: 'center'
						},
						style
					]}
					onPress={onSave}
					// {disabled ? () => {} : onPress}
					activeOpacity={0.5}
				>
					<Text style={{ color: 'white', fontSize: 20 }}>{title}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
});
