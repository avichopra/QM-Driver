import React from 'react';
import { View, ActivityIndicator } from 'react-native';
export default (Loading = (props) => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'transparent',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<ActivityIndicator size="large" color="#000" />
		</View>
	);
});
