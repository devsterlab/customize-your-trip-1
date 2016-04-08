import io from 'socket.io-client';
import {setCars} from '../actions/car';
import {setCities} from '../actions/city';
import {setFlights} from '../actions/flight';
import {setHotels} from '../actions/hotel';

class Socket {
    constructor() {
        if (Socket.instance) return Socket.instance;
        Socket.instance = this;

        this.events = [
            'get_all_cities',
            'get_all_flights',
            'get_all_hotels',
            'get_all_cars'
        ];
    }

    _onConnectError(err, reject) {
        reject(err);
        this.socket.disconnect();
    }

    connect(store) {
        return new Promise((resolve, reject) => {
            this.store = store;
            try {
                this.socket = io.connect('http://192.168.1.48:8081');
                this.socket.on('connect', data => {
                    for (let event of this.events) {
                        this._promisify(event);
                    }

                    resolve(data);
                });
                this.socket.on('error', err => this._onConnectError(err, reject));
                this.socket.on('connect_timeout', err => this._onConnectError(err, reject));
                this.socket.on('connect_error', err => this._onConnectError(err, reject));
                this.socket.on('reconnect_error', err => this._onConnectError(err, reject));
                this.socket.on('reconnect_failed', err => this._onConnectError(err, reject));
            }
            catch(err) { this._onConnectError(err, reject); }
        });
    }

    _promisify(path) {
        this[path] = (data) => {
            return new Promise((resolve, reject) => {
                try {
                    this.socket.on(path, data => resolve(data));
                    this.socket.emit(path, data);
                }
                catch(err) { reject(err); }
            });
        };
    }

    loadCities(id, fields, search) {
        return this.get_all_cities({id, fields, search})
            .then(cities => this.store.dispatch(setCities(cities)));
    }
    loadFlights(id, fields, search) {
        return this.get_all_flights({id, fields, search})
            .then(flights => this.store.dispatch(setFlights(flights)));
    }
    loadHotels(id, fields, search) {
        return this.get_all_hotels({id, fields, search})
            .then(hotels => this.store.dispatch(setHotels(hotels)));
    }
    loadCars(id, fields, search) {
        return this.get_all_cars({id, fields, search})
            .then(cars => this.store.dispatch(setCars(cars)));
    }
}

export default (new Socket());
