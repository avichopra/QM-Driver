import io from 'socket.io-client';
import config from '../config/index';
/**
 * creates a JSON of socket subscription over each view/list
 *  ViewIdSubscriptionMap = {"viewName":[groupIds]}
 * */
import { NavigationActions, StackActions } from 'react-navigation';

import store from '../utilities/store';
import Store from '../redux/store/index';
import { addSocketData, setPatient, setPatientLocation } from '../redux/index';
import { addAllDrivers } from '../redux/actions';
// import { setPatientLocation } from '../redux/actions';
let ViewIdSubscriptionMap = {};
let socket = undefined;
let debugger_socket = undefined;

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
			//   LOG("[websocket] Acknowledgement : ", { data });
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
			let navigation = store.getInstance().getKey('CurrentScreen');
			if (navigation && navigation.route !== 'Home') {
				const navigateAction = StackActions.reset({
					index: 0,
					actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
				});
				navigation.navigation.dispatch(navigateAction);
			}
			// alert('alert');p
			if (filter === 'requestAmbulance') {
				console.warn('socket dataaaaaaaaaaaaaaaaaaaaaaaaaa', socketData.data);
				setPatient(true, socketData.data.patient);
				setPatientLocation(socketData.data.location);
				Store.dispatch(addAllDrivers(socketData.data.allDrivers));
			} else if (filter === 'ShowAcceptDecline') {
				setPatient(false, {});
				setPatientLocation(null);
			} else if (filter === 'RemovePatient' || filter === 'cancelAllDrivers') {
				setPatient(false, {});
			}

			// Store.dispatch(addSocketData('socketData'));
		});
	});
}

export function disconnectSocket() {
	//   LOG("[websocket] Disconnected");
	if (socket) socket.disconnect();
}
export function saveSubscriptionInfo(viewName, groupIds) {
	ViewIdSubscriptionMap[viewName] = ViewIdSubscriptionMap[viewName] || [];

	if (groupIds && groupIds.length > 0) {
		for (let groupId of groupIds) {
			if (!ViewIdSubscriptionMap[viewName].indexOf(groupId) >= 0) ViewIdSubscriptionMap[viewName].push(groupId);
		}
	}

	// console.log("SaveSub->", viewName, " --- ", ViewIdSubscriptionMap);
	subscribeGroups(groupIds);
}

export function unSubscribeSockets(viewName) {
	let groupIds = ViewIdSubscriptionMap[viewName];
	delete ViewIdSubscriptionMap[viewName];
	if (!groupIds || groupIds.length < 1) {
		return;
	}
	/**
     * check for groupId exists for some other view or not,
     * and unsubscribe socket if it is not not used for other view.
     * */
	if (!isInViewIdSubscriptionMap(groupIds)) {
		unSubscribeGroups(groupIds);
	}
}

// export function onSocketData(groupId, onData) {
// 	socket.on('updateInRow', (socketData) => {
// 		let { group } = socketData;

// 		if (group === groupId) {
// 			return onData(socketData);
// 		}
// 	});
// }
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