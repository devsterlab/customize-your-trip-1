import React, { Component, PropTypes } from 'react';
import DateHelper from '../../util/dateHelper';
import Card from '../Card';
import Stars from '../Stars';

class CarCard extends Component {
    static propTypes = {
        children: PropTypes.node,
        car: PropTypes.object,
        onClick: PropTypes.func,
        className: PropTypes.string,
        price: PropTypes.number
    };

    render() {
        let { children, car, onClick, className, price, ...other } = this.props;
        return (
            <Card className={`car-card ${className || ''}`} image={car.image} {...other}
                  price={price > 0 && price || car.price}
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
