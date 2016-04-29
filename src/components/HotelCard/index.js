import React, { Component, PropTypes } from 'react';
import Card from '../Card';
import Stars from '../Stars';

class HotelCard extends Component {
    static propTypes = {
        hotel: PropTypes.shape({
            _id: PropTypes.string,
            city: PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string
            }),
            name: PropTypes.string,
            popularity: PropTypes.number,
            images: PropTypes.arrayOf(PropTypes.string),
            stars: PropTypes.number,
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            address: PropTypes.string,
            description: PropTypes.string,
            price: PropTypes.number
        }),
        onClick: PropTypes.func,
        onInfoClick: PropTypes.func,
        className: PropTypes.string,
        price: PropTypes.number,
        days: PropTypes.number,
        spinnerParent: PropTypes.string
    };

    shouldComponentUpdate(props) {
        return props.hotel !== this.props.hotel
            || props.price !== this.props.price
            || props.days !== this.props.days
            || props.className !== this.props.className;
    }

    handleInfoClick(e) {
        e.stopPropagation();
        this.props.onInfoClick(this.props.hotel);
    }

    render() {
        let { hotel, onClick, onInfoClick, className, price, spinnerParent, ...other } = this.props;
        return (
            <Card className={`hotel-card ${className || ''}`} image={hotel.images[0]} {...other}
                  price={price > 0 && price || hotel.price} spinnerParent={spinnerParent || '.hotels-list'}
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
