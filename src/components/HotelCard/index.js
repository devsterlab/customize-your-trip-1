import React, { Component, PropTypes } from 'react';
import DateHelper from '../../util/dateHelper';
import Card from '../Card';
import Stars from '../Stars';

class HotelCard extends Component {
    static propTypes = {
        children: PropTypes.node,
        hotel: PropTypes.object,
        onClick: PropTypes.func,
        onInfoClick: PropTypes.func,
        className: PropTypes.string,
        price: PropTypes.number
    };

    handleInfoClick(e) {
        e.stopPropagation();
        this.props.onInfoClick(this.props.hotel);
    }

    render() {
        let {hotel} = this.props;
        return (
            <Card className={`hotel-card ${this.props.className || ''}`} image={hotel.images[0]}
                  price={`$ ${this.props.price > 0 && this.props.price || hotel.price}`}
                  onClick={() => this.props.onClick && this.props.onClick(hotel)}>
                <h5 className="name">{hotel.name}</h5>
                <Stars count={hotel.stars}/>

                <div className="description">{hotel.description}</div>
                {this.props.onInfoClick && <div onClick={e => this.handleInfoClick(e)}>
                    <i className="mdi mdi-information"></i>
                    <span className="info">Hotel information</span>
                </div>}
            </Card>
        );
    }
}

export default HotelCard;
