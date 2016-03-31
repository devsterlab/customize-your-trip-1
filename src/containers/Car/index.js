import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flightCity } from '../../reducers';

class Car extends Component {
    static propTypes = {
        children: PropTypes.node,
        city: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            bounds: PropTypes.shape({
                south: PropTypes.number, west: PropTypes.number,
                north: PropTypes.number, east: PropTypes.number}),
            timezone: PropTypes.number
        }),
        cars: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            city: PropTypes.string,
            cityName: PropTypes.string,
            brand: PropTypes.string,
            model: PropTypes.string,
            image: PropTypes.string,
            carType: PropTypes.string,
            price: PropTypes.number,
            transmission: PropTypes.oneOf(['manual', 'automatic']),
            maxPassengers: PropTypes.number
        }))
    };

    render() {
        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    let city = flightCity(state);
    return {
        city,
        cars: state.car.cars.filter(el => el.id == city.id)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ }, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Car);