import React, { Component, PropTypes } from 'react';
import DateHelper from '../util/dateHelper';
import Stars from './Stars';

class HotelCard extends Component {
    static propTypes = {
        children: PropTypes.node,
        hotel: PropTypes.object,
        onClick: PropTypes.func,
        className: PropTypes.string
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
                <div className="medium-4 columns image">
                    <img src={`${hotel.images[0]}'?id='${hotel.id}`}/>
                </div>
                <div className="medium-8 columns content">
                    <div>
                        <h5 className="name">{hotel.name}</h5>
                        <Stars count={hotel.stars}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotelCard;
