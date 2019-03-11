import io from 'socket.io-client';
import config from '../config/index';
import { NavigationActions, StackActions } from 'react-navigation';
import store from '../utilities/store';
import Store from '../redux/store/index';
import {setGPSData } from '../redux/index';
import { patientTempData,cancelTrip} from '../redux/actions';
let ViewIdSubscriptionMap = {};
let socket = undefined;
export function connectToSocket() {
	return new Promise((resolve, reject) => {
		const options = {
			transports: [ 'websocket' ],
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 5000,
			reconnectionAttempts: 99999,
			secure: true
		};
		socket = io.connect(config.SERVER_SOCKET_URL, options);
		socket.on('connect', () => {
			console.warn('connected');
			for (let [ viewName, groupIds ] of Object.entries(ViewIdSubscriptionMap)) {
				subscribeGroups(groupIds);
			}
		});
		socket.on('disconnect', () => {
			console.warn('disconected');
		});

		socket.on('subscription_id', (data) => {
			console.warn('socket id', data);
			resolve(data);
		});
		socket.on('error', (err) => {
			reject(err);
		});

		socket.on('connect_error', (err) => {
			reject(err);
		});

		socket.on('connect_failed', (err) => {
			reject(err);
		});
		socket.on('updateInRow', (socketData) => {
			filter = socketData.data.filter;
			// let { group } = socketData;
			console.warn("socket data in driver app",socketData)
			let navigation = store.getInstance().getKey('CurrentScreen');
			if (navigation && navigation.route !== 'Home') {
				const navigateAction = StackActions.reset({
					index: 0,
					actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
				});
				navigation.navigation.dispatch(navigateAction);
			}
			if (filter === 'requestAmbulance') {
				console.warn('socket dataaaaaaaaaaaaaaaaaaaaaaaaaa', socketData.data);
				if(!ViewIdSubscriptionMap["TripInProgress"])
				{
					if(!ViewIdSubscriptionMap["Trip"])
					{
				saveSubscriptionInfo("Trip",[socketData.data.patient.RequestData._id])
				Store.dispatch(patientTempData(socketData.data))
					}
				}
			} else if (filter === 'ShowAcceptDecline') {
				unSubscribeSockets("Trip");
				Store.dispatch(patientTempData(null))
			} else if (filter === 'RemovePatient' || filter === 'cancelAllDrivers') {
				unSubscribeSockets("Trip");
				Store.dispatch(cancelTrip())
			}
			else if(filter==="Gps_Device_Data")
			{
				console.warn("Gps Data",socketData.data.data)
				setGPSData(socketData.data.data)
			}
		});
	});
}
export function disconnectSocket() {
	if (socket) socket.disconnect();
}
export function saveSubscriptionInfo(viewName, groupIds) {
	ViewIdSubscriptionMap[viewName] = ViewIdSubscriptionMap[viewName] || [];

	if (groupIds && groupIds.length > 0) {
		for (let groupId of groupIds) {
			if (!ViewIdSubscriptionMap[viewName].indexOf(groupId) >= 0) ViewIdSubscriptionMap[viewName].push(groupId);
		}
	}
	subscribeGroups(groupIds);
}
export function unSubscribeSockets(viewName) {
	let groupIds = ViewIdSubscriptionMap[viewName];
	delete ViewIdSubscriptionMap[viewName];
	if (!groupIds || groupIds.length < 1) {
		return;
	}
	if (!isInViewIdSubscriptionMap(groupIds)) {
		unSubscribeGroups(groupIds);
	}
}
export function subscribeGroups(groups) {
	socket.emit('subscribe', groups);
}
function unSubscribeGroups(groups) {
	console.log('un ______________________-', groups);
	socket.emit('unsubscribe', groups);
}
function isInViewIdSubscriptionMap(groupIds) {
	for (let groupId of groupIds) {
		for (let groupIdArray of Object.values(ViewIdSubscriptionMap)) {
			if (groupIdArray && groupIdArray.indexOf(groupId) >= 0) {
				return true;
			}
		}
	}
	return false;
}
