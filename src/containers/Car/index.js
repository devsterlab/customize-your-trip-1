import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flightCity } from '../../reducers';
import { selectCar, setCarsSort, setCarDays } from '../../actions/car';
import DateHelper from '../../util/dateHelper';
import CarCard from '../../components/CarCard';
import Button from '../../components/Button';

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
        })),
        selectedHotel: PropTypes.string,
        selectedCar: PropTypes.string,
        hotelDays: PropTypes.number
    };

    static defaultProps = {
        city: {
            bounds: {}
        },
        sorting: {
            field: 'popularity',
            asc: false
        },
        maxDays: 99
    };

    render() {
        let date = new Date();
        return (
            this.props.selectedHotel &&
            <div className="height-100">
                <div className="car-header">
                    <div className="inline">
                        <h3>{this.props.city.name}</h3>
                        <span>
                            Day 1-{this.props.hotelDays}&nbsp;
                            ({DateHelper.format(date)} - {DateHelper.format(DateHelper.addDays(date, this.props.hotelDays))})
                        </span>
                    </div>
                    <Button className="success float-right large continue-button" link="/summary">
                        {this.selectedCar && 'Continue' || 'Skip'}
                    </Button>
                </div>
                <hr/>
                {this.props.cars.map(car =>
                    <CarCard key={car.id} car={car}/>
                )}
            </div>
            ||
            <div className="height-100"><h2 className="subheader text-center">You should select hotel first</h2></div>
        );
    }
}

function mapStateToProps(state) {
    let city = flightCity(state);
    return {
        city,
        cars: city && state.car.cars.filter(el => el.city == city.id) || [],
        selectedHotel: state.hotel.selectedHotel,
        selectedCar: state.car.selectedCar,
        sorting: state.car.sorting,
        hotelDays: state.hotel.days
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ selectCar, setCarsSort, setCarDays }, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Car);
