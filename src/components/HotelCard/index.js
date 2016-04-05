import React, { Component, PropTypes } from 'react';
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
        let { children, hotel, onClick, onInfoClick, className, price, ...other } = this.props;
        return (
            <Card className={`hotel-card ${className || ''}`} image={hotel.images[0]} {...other}
                  price={price > 0 && price || hotel.price}
                  onClick={() => onClick && onClick(hotel)}>
                <h5 className="name">{hotel.name}</h5>
                <Stars count={hotel.stars}/>

                <div className="description">{hotel.description}</div>
                {onInfoClick && <div onClick={e => this.handleInfoClick(e)}>
                    <i className="mdi mdi-information"></i>
                    <span className="info">Hotel information</span>
                </div>}
            </Card>
        );
    }
}

export default HotelCard;
