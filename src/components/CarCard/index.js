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
        let {car} = this.props;
        return (
            <Card className={`car-card ${this.props.className || ''}`} image={car.image}
                  price={`$ ${this.props.price > 0 && this.props.price || car.price}`}
                  onClick={() => this.props.onClick && this.props.onClick(car)}>
                <h5>{`${car.brand} ${car.model}`}</h5>
                <div>Type: {car.carType}</div>
                <div>Transmission: {car.transmission}</div>
                <div>Max passengers: {car.maxPassengers}</div>
            </Card>
        );
    }
}

export default CarCard;
