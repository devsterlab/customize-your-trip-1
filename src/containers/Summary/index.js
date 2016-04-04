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
import Button from '../../components/Button';

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
        const summaryAvailable = flight && hotel;
        if (summaryAvailable) {
            var date = new Date(), days = Math.max(hotelDays, carDays);
            var arriveDate = DateHelper.addTimeStr(date, flight.duration);
            var tripDate = DateHelper.addDays(arriveDate, days);
        }

        return (
            summaryAvailable &&
            <div className="summary row height-100">
                <h3 className="header">Your <strong>trip summary</strong> looks great!</h3>
                <Button className="success float-right large continue-button" link="/flight">
                    Continue
                </Button>
                <hr className="divider"/>
                <Timeline>
                    <Category className="first">
                        <Title date={date} icon="mdi-home">{flight.fromCityName}</Title>
                        <Item icon="mdi-airplane" className="last">
                            <Content>
                                <FlightCard flight={flight}/>
                            </Content>
                            <Actions></Actions>
                        </Item>
                    </Category>
                    <Category>
                        <Title date={arriveDate} icon="mdi-city"
                               secondary={`${DateHelper.formatDateMonth(arriveDate)} - ${DateHelper.formatDateMonth(tripDate)}`
                               + ` | ${DateHelper.formatDays(days)}`}>
                            {flight.toCityName}
                        </Title>
                        <Item icon="mdi-hotel" className={`${!car && 'last'}`}>
                            <Content>
                                <HotelCard hotel={hotel} price={hotel.price} days={hotelDays}/>
                            </Content>
                            <Actions></Actions>
                        </Item>
                        {car && <Item icon="mdi-car" className="last">
                            <Content>
                                <CarCard car={car} price={car.price} days={carDays}/>
                            </Content>
                            <Actions></Actions>
                        </Item>}
                    </Category>
                    <Category className="last">
                        <Title date={tripDate} icon="mdi-flag-checkered"
                               secondary={`${DateHelper.formatDateMonth(arriveDate)} - ${DateHelper.formatDateMonth(tripDate)}`
                               + ` | ${DateHelper.formatDays(days)}`}>
                            Trip end:&nbsp;
                            <strong>${flight.price + (hotel.price * hotelDays) + (car && (car.price * carDays) || 0)}</strong>
                        </Title>
                    </Category>
                </Timeline>
            </div> ||
            <div className="height-100">
                <h2 className="subheader text-center">{flight ? 'Hotel' : 'Flight'} not selected</h2>
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