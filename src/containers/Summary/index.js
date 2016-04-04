import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateHelper from '../../util/dateHelper';

import Timeline from '../../components/Timeline';
import Category from '../../components/Timeline/Category';
import Title from '../../components/Timeline/Title';
import Item from '../../components/Timeline/Item';
import Content from '../../components/Timeline/Content';
import Actions from '../../components/Timeline/Actions';

import FlightCard from '../../components/FlightCard';
import HotelCard from '../../components/HotelCard';
import CarCard from '../../components/CarCard';

class Summary extends Component {
    static propTypes = {
        children: PropTypes.node,
        flight: PropTypes.shape({
            id: PropTypes.string,
            fromCity: PropTypes.string,
            toCity: PropTypes.string,
            fromCityName: PropTypes.string,
            toCityName: PropTypes.string,
            companyName: PropTypes.string,
            available: PropTypes.number,
            price: PropTypes.number,
            departTime: PropTypes.string,
            duration: PropTypes.string
        }),
        hotel: PropTypes.shape({
            id: PropTypes.string,
            city: PropTypes.string,
            cityName: PropTypes.string,
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
        car: PropTypes.shape({
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
        }),
        hotelDays: PropTypes.number,
        carDays: PropTypes.number
    };

    render() {
        let { flight, hotel, car, hotelDays, carDays } = this.props;
        let date = new Date(), days = Math.max(hotelDays, carDays);
        let arriveDate = DateHelper.addTimeStr(date, flight.duration);
        let tripDate = DateHelper.addDays(arriveDate, days);

        return (
            <div className="summary">
                <h3 className="header">Your <strong>trip summary</strong> looks great!</h3>
                <hr className="divider"/>
                <Timeline>
                    <Category className="first">
                        <Title date={date} icon="mdi-home">{flight.fromCityName}</Title>
                        <Item icon="mdi-airplane">
                            <Content>
                                <FlightCard flight={flight}/>
                            </Content>
                            <Actions></Actions>
                        </Item>
                    </Category>
                    <Category className="last">
                        <Title date={arriveDate} icon="mdi-city"
                               secondary={`${DateHelper.format(arriveDate)} - ${DateHelper.format(tripDate)}`
                               + ` | ${days} ${days > 1 ? 'days' : 'day'}`}>
                            {flight.toCityName}
                        </Title>
                        <Item icon="mdi-hotel" className={`${!car && 'last'}`}>
                            <Content>
                                <HotelCard hotel={hotel}/>
                            </Content>
                            <Actions></Actions>
                        </Item>
                        {car && <Item icon="mdi-car" className="last">
                            <Content>
                                <CarCard car={car}/>
                            </Content>
                            <Actions></Actions>
                        </Item>}
                    </Category>
                </Timeline>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        hotel: state.hotel.hotels.find(el => el.id == state.hotel.selectedHotel),
        flight: state.flight.flights.find(el => el.id == state.flight.selectedFlight),
        car: state.car.cars.find(el => el.id == state.car.selectedCar),
        hotelDays: state.hotel.days,
        carDays: state.car.days
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Summary);