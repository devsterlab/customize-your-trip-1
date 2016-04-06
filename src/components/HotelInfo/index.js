import React, { Component, PropTypes } from 'react';
import Orbit from '../Orbit';
import Stars from '../Stars';
import Button from '../Button';

class HotelInfo extends Component {
    static propTypes = {
        children: PropTypes.node,
        hotel: PropTypes.object,
        onSelect: PropTypes.func
    };

    render() {
        let {hotel} = this.props;
        return (
            <div className="hotel-info">
                <h1 className="name float-left">{hotel.name}</h1>
                <Stars className="float-left" count={hotel.stars} />
                <hr/>
                <div className="row">
                    <div className="medium-8 columns">
                        <Orbit images={hotel.images}/>
                    </div>
                    <div className="medium-4 columns content">
                        <h4>Description</h4>
                        <p>{hotel.description}</p>
                        <h4>Address</h4>
                        <p>{hotel.city.name}, {hotel.address}</p>
                        <hr/>
                        <h4 className="inline">Price per night:</h4>
                        <h3 className="inline float-right">${hotel.price}</h3>
                        <Button className="large success expanded" onClick={() => this.props.onSelect(this.props.hotel)}>
                            Select
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotelInfo;
