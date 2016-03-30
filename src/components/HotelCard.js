import React, { Component, PropTypes } from 'react';
import DateHelper from '../util/dateHelper';
import Stars from './Stars';
import Image from './Image';

class HotelCard extends Component {
    static propTypes = {
        children: PropTypes.node,
        hotel: PropTypes.object,
        onClick: PropTypes.func,
        className: PropTypes.string,
        price: PropTypes.number
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
    }

    convertDates(props) {
    }

    render() {
        let {hotel} = this.props;
        return (
            <div className={`callout row hotel-card ${this.props.className || ''}`}
                 onClick={() => this.props.onClick && this.props.onClick(hotel)}>
                <div className="small-4 columns image-wrap">
                    <Image src={hotel.images[0]} />
                </div>
                <div className="small-8 columns content">
                    <div>
                        <h5 className="name">{hotel.name}</h5>
                        <Stars count={hotel.stars}/>
                        <div className="description">{hotel.description}</div>
                        <div>
                            <i className="mdi mdi-information"></i>
                            <span className="info">Hotel information</span>
                        </div>
                    </div>
                </div>
                <div className="price text-center">${this.props.price > 0 && this.props.price || hotel.price}</div>
            </div>
        );
    }
}

export default HotelCard;
