import React, { Component, PropTypes } from 'react';
import Card from '../Card';
import Stars from '../Stars';

class CarCard extends Component {
    static propTypes = {
        car: PropTypes.shape({
            _id: PropTypes.string,
            city: PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string
            }),
            brand: PropTypes.string,
            model: PropTypes.string,
            image: PropTypes.string,
            carType: PropTypes.string,
            price: PropTypes.number,
            transmission: PropTypes.oneOf(['manual', 'automatic']),
            maxPassengers: PropTypes.number
        }),
        onClick: PropTypes.func,
        className: PropTypes.string,
        price: PropTypes.number,
        spinnerParent: PropTypes.string
    };

    shouldComponentUpdate(props) {
        return props.car !== this.props.car
            || props.price !== this.props.price
            || props.days !== this.props.days;
    }

    render() {
        let { car, onClick, className, price, spinnerParent, ...other } = this.props;
        return (
            <Card className={`car-card ${className || ''}`} image={car.image} {...other}
                  price={price > 0 && price || car.price} spinnerParent={spinnerParent || '.cars-list'}
                  onClick={() => onClick && onClick(car)}>
                <h5>{`${car.brand} ${car.model}`}</h5>
                <div>Type: {car.carType}</div>
                <div>Transmission: {car.transmission}</div>
                <div>Max passengers: {car.maxPassengers}</div>
            </Card>
        );
    }
}

export default CarCard;
