import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCities, getCities } from '../actions/city';
import { setFlights, getFlights } from '../actions/flight';
import { setHotels, getHotels } from '../actions/hotel';
import { setCars, getCars } from '../actions/car';
import Header from '../components/Header';
import Progress from '../components/Progress';

class App extends Component {
    static propTypes = {
        children: PropTypes.element,
        location: PropTypes.object,
        connected: PropTypes.bool,
        selectedFlight: PropTypes.string,
        selectedHotel: PropTypes.string,
        selectedCar: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {};
        this.loadData(props);
    }

    componentWillReceiveProps(props) {
        this.loadData(props);
    }

    loadData(props) {
        if (props.connected && !this.dataLoaded) {
            this.dataLoaded = true;
            let loadState = {};
            
            if (props.selectedFlight) {
                props.actions.getFlights({
                    data: {id: props.selectedFlight},
                    action: setFlights,
                    callback: (flights) => {
                        let flight = flights && flights[0];
                        if (flight) {
                            this.setState({flightLoaded: true});
                            props.actions.getCities({
                                data: {id: flight.toCity._id},
                                action: setCities,
                                callback: () => this.setState({cityLoaded: true})
                            });
                        }
                        else this.setState({flightLoaded: true, cityLoaded: true});
                    }
                });
            }
            else {
                loadState.flightLoaded = true;
                loadState.cityLoaded = true;
            }

            if (props.selectedHotel) {
                props.actions.getHotels({
                    data: {id: props.selectedHotel},
                    action: setHotels,
                    callback: () => this.setState({hotelLoaded: true})
                });
            }
            else loadState.hotelLoaded = true;

            if (props.selectedCar) {
                props.actions.getCars({
                    data: {id: props.selectedCar},
                    action: setCars,
                    callback: () => this.setState({carLoaded: true})
                });
            }
            else loadState.carLoaded = true;

            this.setState(loadState);
        }
    }

    isDataLoaded() {
        return this.state.cityLoaded && this.state.flightLoaded && this.state.hotelLoaded && this.state.carLoaded;
    }

    render() {
        return (
            <div className="row height-100">
                <div className="height-100">
                    <Header location={this.props.location}/>
                    <div className="tabs-content nav-tabs">
                        <div className="tabs-panel is-active height-100">
                            <Progress loaded={this.isDataLoaded()} />
                            {this.isDataLoaded() && this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        connected: state.summary.connected,
        selectedFlight: state.flight.selectedFlight,
        selectedHotel: state.hotel.selectedHotel,
        selectedCar: state.car.selectedCar
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setCities, getCities,
            setFlights, getFlights,
            setHotels, getHotels,
            setCars, getCars
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
