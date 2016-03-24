import React from 'react'
import {GoogleMapLoader, GoogleMap, Marker, Polygon} from 'react-google-maps';

export default function TripMap (props) {
    return (
        <section className={'height-100 ' + props.className}>
            <GoogleMapLoader
                containerElement={
                    <div {...props} className="height-100"/>
                }
                googleMapElement={
                    <GoogleMap
                        defaultZoom={3}
                        defaultCenter={{lat: 50.5194023, lng: 30.4623659}}
                    >
                        {props.markers.map((marker, index) => {
                            return (
                                <Marker key={index}
                                    {...marker}
                                />
                            );
                        })}
                        {props.polygons.map((polygon, index) => {
                            return (
                                <Polygon key={index}
                                    {...polygon}
                                />
                            );
                        })}
                    </GoogleMap>
                }
            />
        </section>
    );
}