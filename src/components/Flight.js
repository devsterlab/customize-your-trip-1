import React, { Component, PropTypes } from 'react';
import TripMap from './TripMap';
import Geocoding from '../util/geocoding';

class Flight extends Component {
    constructor(props) {
        super(props);

        this.markers = [];
        this.polygons = [];
        Geocoding.geocodeAddress('Madrid').then(res => {
            console.log(res);
            let bounds = res[0].geometry.bounds.toJSON();
            console.log(JSON.stringify(bounds));
            this.markers.push({position: {
                lat: bounds.south,
                lng: bounds.west
            }});
            this.markers.push({position: {
                lat: bounds.north,
                lng: bounds.east
            }});
            this.forceUpdate();
        });
    }

    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div className="height-100">

                <div className="row height-100">
                    <TripMap markers={this.markers} polygons={this.polygons} className="medium-8 columns"/>
                    <div className="medium-4 columns">Search results</div>
                </div>
            </div>
        );
    }
}

export default Flight;
