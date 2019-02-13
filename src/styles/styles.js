import { Dimensions, StyleSheet } from 'react-native';
import { isSmallScreen } from '../utilities';
import { TOOLBAR_HEIGHT, PADIING_TOP_TOOLBAR } from '../utilities/constants';
// import { isIphoneX } from '../utilities/deviceValidations';

const { width, height } = Dimensions.get('window');
export const Palette = {
	white: '#f1f1f1',
	black: '#212121',
	black50: 'rgba(0,0,0,0.5)',
	white20: 'rgba(255,255,255,0.2)',
	white50: 'rgba(255,255,255,0.5)',
	white70: 'rgba(255,255,255,0.7)',
	red: '#F44336',
	hButton: '#f6263f',
	blue: '#0499DC',
	darkblue: '#01579B',
	lightblue: '#03A9F4',
	lightblue50: 'rgba(3,169,244,0.5)',
	softgrey: '#E0E0E0',
	lightergrey: '#C4BFBF',
	lightgrey: '#9E9E9E',
	grey: '#616161',
	darkergrey: '#4A4A4A',
	mediumgrey: '#d8d8d8',
	green: '#A2D739',
	orange: '#FF9800',
	gold: '#FFEB3B',
	lightpink: '#EE586A',
	inactive: '#878787',
	inactiveTab: '#9B9B9B',
	divider: '#CCCCCC',
	winning: '#8BC34A',
	gameBlue: '#0059A3',
	gameBlueAlpha: 'rgba(0, 89, 163, 0.9)',
	gameRed: '#D0021B',
	gameRedAlpha: 'rgba(208, 2, 27, 0.9)',
	gameBlackAlpha: 'rgba(43,45,50,0.95)',
	teal: '#14838E',
	active: '#B8E986'
};

export default StyleSheet.create({
	w25: { width: 25 },
	w50: { width: 50 },
	w00: { width: 100 },
	w200: { width: 200 },
	w250: { width: 250 },
	w300: { width: 300 },
	wMax: { width: width - 20 },

	h45: { height: 45 },
	h50: { height: 50 },
	h55: { height: 55 },
	h100: { height: 100 },
	h120: { height: 120 },
	h150: { height: 150 },
	h200: { height: 200 },
	h250: { height: 250 },
	hX: { height: isIphoneX() ? 24 : 0 },

	m0: { margin: 0 },
	m2: { margin: 2 },
	m5: { margin: 5 },
	m10: { margin: 10 },
	m20: { margin: 20 },
	m24: { margin: 24 },
	m25: { margin: 25 },
	m30: { margin: 30 },

	mh0: { marginHorizontal: 0 },
	mh5: { marginHorizontal: 5 },
	mh10: { marginHorizontal: 10 },
	mh15: { marginHorizontal: 15 },
	mh20: { marginHorizontal: 20 },
	mh25: { marginHorizontal: 25 },
	mh30: { marginHorizontal: 30 },

	mv5: { marginVertical: 5 },
	mv10: { marginVertical: 10 },
	mv15: { marginVertical: 15 },
	mv20: { marginVertical: 20 },
	mv25: { marginVertical: 25 },
	mv30: { marginVertical: 30 },

	mt0: { marginTop: 0 },
	mt2: { marginTop: 2 },
	mt3: { marginTop: 3 },
	mt4: { marginTop: 4 },
	mt5: { marginTop: 5 },
	mt10: { marginTop: 10 },
	mt12: { marginTop: 12 },
	mt15: { marginTop: 15 },
	mt16: { marginTop: 16 },
	mt20: { marginTop: 20 },
	mt24: { marginTop: 24 },
	mt30: { marginTop: 30 },
	mt40: { marginTop: 40 },

	mb0: { marginBottom: 0 },
	mb2: { marginBottom: 2 },
	mb3: { marginBottom: 3 },
	mb5: { marginBottom: 5 },
	mb10: { marginBottom: 10 },
	mb15: { marginBottom: 15 },
	mb20: { marginBottom: 20 },
	mb24: { marginBottom: 24 },
	mbX: { marginBottom: isIphoneX() ? 24 : 0 },

	ml0: { marginLeft: 0 },
	ml5: { marginLeft: 5 },
	ml10: { marginLeft: 10 },
	ml12: { marginLeft: 12 },
	ml15: { marginLeft: 15 },
	ml20: { marginLeft: 20 },

	mr0: { marginRight: 0 },
	mr5: { marginRight: 5 },
	mr10: { marginRight: 10 },
	mr15: { marginRight: 15 },
	mr20: { marginRight: 20 },
	mr24: { marginRight: 24 },

	p0: { padding: 0 },
	p5: { padding: 5 },
	p10: { padding: 10 },
	p15: { padding: 15 },
	p20: { padding: 20 },
	p24: { padding: 24 },

	ph0: { paddingHorizontal: 0 },
	ph5: { paddingHorizontal: 5 },
	ph10: { paddingHorizontal: 10 },
	ph15: { paddingHorizontal: 15 },
	ph16: { paddingHorizontal: 16 },
	ph20: { paddingHorizontal: 20 },
	ph24: { paddingHorizontal: 24 },
	ph25: { paddingHorizontal: 25 },
	ph30: { paddingHorizontal: 30 },

	pv0: { paddingVertical: 0 },
	pv5: { paddingVertical: 5 },
	pv8: { paddingVertical: 8 },
	pv10: { paddingVertical: 10 },
	pv15: { paddingVertical: 15 },
	pv16: { paddingVertical: 16 },
	pv20: { paddingVertical: 20 },
	pv24: { paddingVertical: 24 },
	pv25: { paddingVertical: 25 },
	pv30: { paddingVertical: 30 },

	pt0: { paddingTop: 0 },
	pt5: { paddingTop: 5 },
	pt6: { paddingTop: 6 },
	pt10: { paddingTop: 10 },
	pt15: { paddingTop: 15 },
	pt20: { paddingTop: 20 },
	pt24: { paddingTop: 24 },

	pb0: { paddingBottom: 0 },
	pb5: { paddingBottom: 5 },
	pb2: { paddingBottom: 2 },
	pb10: { paddingBottom: 10 },
	pb15: { paddingBottom: 15 },
	pb24: { paddingBottom: 24 },

	pl0: { paddingLeft: 0 },
	pl5: { paddingLeft: 5 },
	pl10: { paddingLeft: 10 },
	pl15: { paddingLeft: 15 },
	pl20: { paddingLeft: 20 },

	pr0: { paddingRight: 0 },
	pr5: { paddingRight: 5 },
	pr6: { paddingRight: 6 },
	pr10: { paddingRight: 10 },
	pr15: { paddingRight: 15 },
	pr20: { paddingRight: 20 },

	opacity100: { opacity: 1 },
	opacity95: { opacity: 0.95 },
	opacity90: { opacity: 0.9 },
	opacity40: { opacity: 0.4 },
	opacity0: { opacity: 0 },

	DoPFont: {
		fontFamily: 'DOP-Icons'
	},

	DoPListIcon: {
		fontFamily: 'DOP-Icons',
		fontSize: 16,
		color: Palette.lightgrey
	},

	DoPFilterView: {
		fontFamily: 'DOP-Icons',
		fontSize: 16,
		marginHorizontal: 3
	},

	font10: { fontSize: 10 },
	font12: { fontSize: 12 },
	font13: { fontSize: 13 },
	font14: { fontSize: 14 },
	font16: { fontSize: 16 },
	font18: { fontSize: 18 },
	font20: { fontSize: 20 },
	font24: { fontSize: 24 },
	font26: { fontSize: 26 },
	font28: { fontSize: 28 },

	fontLight8: { fontFamily: 'Roboto-Light', fontSize: 8 },
	fontLight10: { fontFamily: 'Roboto-Light', fontSize: 10 },
	fontLight12: { fontFamily: 'Roboto-Light', fontSize: 12, lineHeight: 14 },
	fontLight14: {
		fontFamily: 'Roboto-Light',
		fontSize: 14,
		lineHeight: 16,
		letterSpacing: 0.5
	},
	fontLight16: { fontFamily: 'Roboto-Light', fontSize: 16, lineHeight: 19 },
	fontLight18: { fontFamily: 'Roboto-Light', fontSize: 18, lineHeight: 21 },
	fontLight20: { fontFamily: 'Roboto-Light', fontSize: 20 },
	fontLight22: { fontFamily: 'Roboto-Light', fontSize: 22 },
	fontLight24: { fontFamily: 'Roboto-Light', fontSize: 24 },
	fontLight36: {
		fontFamily: 'Roboto-Light',
		fontSize: 36,
		color: Palette.gameBlue,
		letterSpacing: 1.65
	},

	fontRegular8: { fontFamily: 'Roboto-Regular', fontSize: 8 },
	fontRegular10: { fontFamily: 'Roboto-Regular', fontSize: 10 },
	fontRegular12: { fontFamily: 'Roboto-Regular', fontSize: 12, lineHeight: 14 },
	fontRegular14: { fontFamily: 'Roboto-Regular', fontSize: 14, lineHeight: 16 },
	fontRegular16: { fontFamily: 'Roboto-Regular', fontSize: 16, lineHeight: 19 },
	fontRegular18: { fontFamily: 'Roboto-Regular', fontSize: 18, lineHeight: 21 },
	fontRegular20: { fontFamily: 'Roboto-Regular', fontSize: 20 },
	fontRegular22: { fontFamily: 'Roboto-Regular', fontSize: 22 },
	fontRegular24: { fontFamily: 'Roboto-Regular', fontSize: 24, lineHeight: 28 },

	helveticaRegular18: { fontFamily: 'Helvetica', fontSize: 18 },
	helveticaRegular16: { fontFamily: 'Helvetica', fontSize: 16 },

	fontMedium8: { fontFamily: 'Roboto-Medium', fontSize: 8 },
	fontMedium10: { fontFamily: 'Roboto-Medium', fontSize: 10 },
	fontMedium12: { fontFamily: 'Roboto-Medium', fontSize: 12, lineHeight: 14 },
	fontMedium14: { fontFamily: 'Roboto-Medium', fontSize: 14, lineHeight: 16 },
	fontMedium16: { fontFamily: 'Roboto-Medium', fontSize: 16, lineHeight: 19 },
	fontMedium18: {
		fontFamily: 'Roboto-Medium',
		fontSize: 18,
		lineHeight: 21,
		letterSpacing: 0.5
	},
	fontMedium20: { fontFamily: 'Roboto-Medium', fontSize: 20 },
	fontMedium22: { fontFamily: 'Roboto-Medium', fontSize: 22 },
	fontMedium24: { fontFamily: 'Roboto-Medium', fontSize: 24 },
	fontMedium28: { fontFamily: 'Roboto-Medium', fontSize: 28 },
	fontMedium48: {
		fontFamily: 'Roboto-Medium',
		fontSize: 48,
		color: Palette.darkblue
	},

	fontMedium: { fontFamily: 'Roboto-Medium' },

	f1: { flex: 1 },
	f2: { flex: 2 },
	f3: { flex: 3 },
	f4: { flex: 4 },
	f5: { flex: 5 },

	bold: { fontWeight: 'bold' },

	textShadow: {
		textShadowRadius: 10,
		textShadowColor: 'rgba(0,0,0,0.7)',
		textShadowOffset: { height: 2, width: 2 }
	},

	cBlack: { color: '#000000' },
	cBlue: { color: '#2196f3' },
	cWhite: { color: '#FFFFFF' },
	cGrey: { color: '#e6e6e6' },
	cRed: { color: '#D50000' },
	cLoserRed: { color: '#F44336' },
	cApp: { color: '#46407B' },
	cAppDark: { color: '#48487B' },

	bgApp: { backgroundColor: '#46407B' },
	bgAppDark: { backgroundColor: '#48487B' },
	bgTransparent: { backgroundColor: 'transparent' },
	bgWhite: { backgroundColor: 'white' },
	bgRed: { backgroundColor: '#D50000' },
	bgBlue: { backgroundColor: '#2196f3' },
	bgLightBlue: { backgroundColor: '#F5FCFF' },
	bgLightGray: { backgroundColor: '#F1F1F1' },
	bgGray: { backgroundColor: '#9D9D9D' },

	textCenter: { textAlign: 'center' },
	textRight: { textAlign: 'right' },

	center: { justifyContent: 'center', alignItems: 'center' },
	aCenter: { alignItems: 'center' },
	aStart: { alignItems: 'flex-start' },
	jStart: { justifyContent: 'flex-start' },
	aSpace: { justifyContent: 'space-between' },
	jCenter: { justifyContent: 'center' },
	aEnd: { alignItems: 'flex-end' },
	jEnd: { justifyContent: 'flex-end' },
	jSpace: { justifyContent: 'space-between' },
	jSpaceAround: { justifyContent: 'space-around' },
	flexRow: { flexDirection: 'row' },
	flexColumn: { flexDirection: 'column' },

	flexWrap: { flexWrap: 'wrap' },

	right0: { position: 'absolute', right: 0 },
	right10: { position: 'absolute', right: 10 },
	right15: { position: 'absolute', right: 15 },

	absolute: { position: 'absolute' },

	l0: { left: 0 },
	l10: { left: 10 },
	l20: { left: 20 },
	l30: { left: 30 },
	l40: { left: 40 },

	r0: { right: 0 },
	r10: { right: 10 },
	r20: { right: 20 },

	t0: { top: 0 },
	t5: { top: 5 },
	t20: { top: 20 },
	t_5: { top: -5 },

	b0: { bottom: 0 },
	b10: { bottom: 10 },

	circle18: {
		height: 18,
		width: 18,
		borderRadius: 18 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle20: {
		height: 20,
		width: 20,
		borderRadius: 20 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle25: {
		height: 25,
		width: 25,
		borderRadius: 25 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle30: {
		height: 30,
		width: 30,
		borderRadius: 30 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle35: {
		height: 35,
		width: 35,
		borderRadius: 35 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle40: {
		height: 40,
		width: 40,
		borderRadius: 40 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle45: {
		height: 45,
		width: 45,
		borderRadius: 45 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle50: {
		height: 50,
		width: 50,
		borderRadius: 50 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle60: {
		height: 60,
		width: 60,
		borderRadius: 60 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle70: {
		height: 70,
		width: 70,
		borderRadius: 70 / 2,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
