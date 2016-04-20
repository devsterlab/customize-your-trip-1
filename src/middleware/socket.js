import io from 'socket.io-client';
import { setConnected } from '../actions/summary';

function onConnectError(socket, err, onSocketError, store) {
    socket.disconnect();
    onSocketError && onSocketError(err, store);
}

export default (onSocketError) => {
    return store => {
        let socket = io.connect(SERVER_URL);

        socket.on('connect', () => store.dispatch(setConnected()));
        socket.on('error', err => onConnectError(socket, err, onSocketError, store));
        socket.on('connect_timeout', err => onConnectError(socket, err, onSocketError, store));
        socket.on('connect_error', err => onConnectError(socket, err, onSocketError, store));
        socket.on('reconnect_error', err => onConnectError(socket, err, onSocketError, store));
        socket.on('reconnect_failed', err => onConnectError(socket, err, onSocketError, store));

        return next => action => {
            if (action.socket) {
                action.socket.sockId = Math.random();
                if (action.socket.action || action.socket.callback) {
                    var socketOn = function (res) {
                        if (res.sockId == action.socket.sockId) {
                            action.socket.action && store.dispatch(action.socket.action(res.data));
                            action.socket.callback && action.socket.callback(res.data);
                            socket.removeListener(action.socket.path, socketOn);
                        }
                    };
                    socket.on(action.socket.path, socketOn);
                }
                socket.emit(action.socket.path, {sockId: action.socket.sockId, data: action.socket.data});
            }
            return next(action);
        };
    }
};