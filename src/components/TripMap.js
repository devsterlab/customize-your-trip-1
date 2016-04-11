import React, { Component, PropTypes } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, Polygon} from 'react-google-maps';

class TripMap extends Component {
    static propTypes = {
        className: PropTypes.string,
        city: PropTypes.object,
        hotels: PropTypes.array,
        selectedHotel: PropTypes.object,
        onMarkerClick: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            zoom: props.selectedHotel && 15 || 11,
            center: props.selectedHotel && this.hotelPosition(props.selectedHotel) || this.calcCenter(props.city.bounds),
            markers: this.createMarkers(props.hotels, props.selectedHotel && props.selectedHotel._id, props.onMarkerClick)
        };
    }

    componentWillReceiveProps(props) {
        if (props.selectedHotel &&
            (!this.props.selectedHotel || props.selectedHotel._id != this.props.selectedHotel._id)) {
            this.setState({
                zoom: 15,
                center: this.hotelPosition(props.selectedHotel),
                markers: this.createMarkers(props.hotels, props.selectedHotel._id, props.onMarkerClick)
            });
        }
    }

    hotelPosition(hotel) {
        return {lat: hotel.latitude, lng: hotel.longitude};
    }

    createMarkers(hotels, selectedId, onClick) {
        return hotels.map(hotel => {
            return {
                label: {
                    text: hotel.name,
                    fontSize: hotel._id == selectedId && '20px' || '14px',
                    fontWeight: '700',
                    color: hotel._id == selectedId && 'green' || 'black'
                },
                title: hotel.name,
                position: {
                    lat: hotel.latitude,
                    lng: hotel.longitude
                },
                onClick: () => onClick(hotel)
            };
        });
    }

    calcCenter(bounds) {
        return {
            lat: (bounds.south + bounds.north) / 2,
            lng: (bounds.west + bounds.east) / 2
        }
    }

    render() {
        return (
            <section className={`height-100 ${this.props.className || ''}`}>
                <GoogleMapLoader
                    containerElement={
                        <div {...this.props} className="height-100"/>
                    }
                    googleMapElement={
                        <GoogleMap zoom={this.state.zoom} center={this.state.center}>
                            {this.state.markers.map((marker, index) => {
                                return (
                                    <Marker key={index}
                                        {...marker}
                                    />
                                );
                            })}
                        </GoogleMap>
                    }
                />
            </section>
        )
    };
}

export default TripMap;
