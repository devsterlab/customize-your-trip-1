import io from 'socket.io-client';

function onConnectError(socket, err, onSocketError, store) {
    socket.disconnect();
    onSocketError && onSocketError(err, store);
}

export default (onSocketError) => {
    return store => {
        let socket = io.connect('http://192.168.1.48:8081');

        socket.on('error', err => onConnectError(socket, err, onSocketError, store));
        socket.on('connect_timeout', err => onConnectError(socket, err, onSocketError, store));
        socket.on('connect_error', err => onConnectError(socket, err, onSocketError, store));
        socket.on('reconnect_error', err => onConnectError(socket, err, onSocketError, store));
        socket.on('reconnect_failed', err => onConnectError(socket, err, onSocketError, store));

        return next => action => {
            if (action.socket) {
                if (action.socket.action) {
                    socket.on(action.socket.path, data => store.dispatch(action.socket.action(data)));
                }
                socket.emit(action.socket.path, action.socket.data);
            }
            return next(action);
        };
    }
};