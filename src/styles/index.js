import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const Palette = {
	hB: '#f6263f',
	w: 'white'
};
export default StyleSheet.create({
	f8: {
		flex: 8
	},
	f1: {
		flexGrow: 1
	},
	f2: {
		flex: 1
	},
	f10: {
		textAlign: 'center',
		marginTop: 13,
		fontSize: 14,
		color: '#2948ff',
		letterSpacing: 0
	},
	f3: {
		flex: 6
	},
	d6: {
		width: 40,
		height: 20
	},
	d1: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	d2: {
		width: 120,
		height: 120
	},
	a9: {
		justifyContent: 'flex-end',

		flexGrow: 1,
		marginVertical: 30,
		flexDirection: 'row'
	},
	a1: {
		alignSelf: 'center'
	},
	d3: {
		marginVertical: 30
	},
	d4: {
		flexDirection: 'row',
		borderBottomColor: '#ffffff',
		borderBottomWidth: 1,
		width: width - 30,
		height: 60
	},
	a10: {
		backgroundColor: 'white',
		borderRadius: 1,
		width: Dimensions.get('window').width / 2 - 30,
		height: 45,
		margin: 10
	},
	a11: {
		borderRadius: 1,
		width: Dimensions.get('window').width / 2 - 30,
		height: 45,
		margin: 10
	},
	d5: {
		width: 20,
		height: 16,
		marginVertical: 30,
		marginHorizontal: 10
	},
	b1: {
		borderWidth: 0
	},
	i1: {
		fontSize: 16,
		color: 'white',
		fontFamily: 'Nunito Regular',
		letterSpacing: 0
	},
	c1: {
		color: 'red'
	},
	j1: {
		justifyContent: 'flex-end'
	},
	d7: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	c2: {
		backgroundColor: 'white',
		borderRadius: 1,
		width: Dimensions.get('window').width - 30,
		height: 45,
		marginVertical: 15
	},
	header: {
		width: '100%',
		backgroundColor: 'blue'
	},
	fr: {
		flexDirection: 'row'
	},
	headerIcon: { height: 30, width: '19%', marginTop: 10, marginLeft: 5 },
	HText: { height: 30, width: '60%', alignItems: 'center', marginTop: 10 },
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
	close: { height: 10, width: 10, alignSelf: 'flex-end', marginVertical: 10 },
	circle50: {
		height: 50,
		width: 50,
		borderRadius: 50 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle70: {
		height: 70,
		width: 70,
		borderRadius: 70 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle90: {
		height: 90,
		width: 90,
		borderRadius: 45,
		alignItems: 'center',
		justifyContent: 'center'
	},
	center: { alignItems: 'center', justifyContent: 'center' },
	divider: {
		height: 0.8,
		backgroundColor: 'rgba(215,219,221,0.7)',
		width: '100%'
	},
	h200: { height: 200 },
	h250: { height: 250 },
	h150: { height: 150 },
	fr: { flexDirection: 'row', alignItems: 'center' },
	frSelf: { flexDirection: 'row', alignSelf: 'center' },
	icon19: { height: 19, width: 19 },
	call: {
		height: 30,
		width: 80,
		backgroundColor: '#76d015',
		borderRadius: 30,
		flexDirection: 'row'
	},
	bold: { fontFamily: 'NunitoSans-SemiBold' },
	f18: { fontSize: 18 },
	wbg: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white' },
	ml5: { marginLeft: 5 },
	mb5: { marginBottom: 5 }
	// wbg: { width: '100%', backgroundColor: 'white' }
});
