import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectCity } from '../../actions/city';
import { selectFlight, setFlightsSort, setFlightsSearched } from '../../actions/flight';
import Sorting from '../../util/sorting';
import Select from '../../components/Select';
import FlightCard from '../../components/FlightCard';
import Sort from '../../components/Sort';
import Button from '../../components/Button';

class Flight extends Component {
    static propTypes = {
        children: PropTypes.node,
        cities: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            bounds: PropTypes.shape({
                south: PropTypes.number, west: PropTypes.number,
                north: PropTypes.number, east: PropTypes.number}),
            timezone: PropTypes.number
        })),
        flights: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            fromCity: PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string,
                timezone: PropTypes.number
            }),
            toCity: PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string,
                timezone: PropTypes.number
            }),
            companyName: PropTypes.string,
            available: PropTypes.number,
            price: PropTypes.number,
            departTime: PropTypes.string,
            duration: PropTypes.string
        })),
        selectedCityFrom: PropTypes.string,
        selectedCityTo: PropTypes.string,
        sorting: PropTypes.shape({
            field: PropTypes.string,
            asc: PropTypes.bool
        }),
        selectedFlight: PropTypes.string,
        actions: PropTypes.object,
        date: PropTypes.object,
        homeCity: PropTypes.string,
        lastCityFrom: PropTypes.string,
        lastCityTo: PropTypes.string
    };

    static defaultProps = {
        sorting: {
            field: 'departTime',
            asc: true
        }
    };

    constructor(props) {
        super(props);

        this.selectedFlight = props.flights.find(el => el._id == props.selectedFlight);
        this.state = {
            flights: this.sort(this.filterFlights(props.flights), props.sorting.field, props.sorting.asc)
        };
        Object.assign(this.state, this.handleCitiesEqual(props.selectedCityFrom, props.selectedCityTo));

        this.handleCityFromChange = this._handleCityFromChange.bind(this);
        this.handleCityToChange = this._handleCityToChange.bind(this);
        this.searchFlights = this._searchFlights.bind(this);
        this.selectFlight = this._selectFlight.bind(this);
    }

    handleCityChange(city, from, to) {
        let state = Object.assign({}, this.handleCityNotFound(city, from));
        let otherCity = this.props['selectedCity' + to];
        if (city && otherCity) Object.assign(state, this.handleCitiesEqual(city._id, otherCity));
        this.setState(state);
        this.props.actions.selectCity(city && city._id, from);
    }

    _handleCityFromChange(city) {
        this.handleCityChange(city, 'From', 'To');
    }

    _handleCityToChange(city) {
        this.handleCityChange(city, 'To', 'From');
    }

    handleCityNotFound(city, fromTo) {
        if (!city) return {['errorCity' + fromTo]: 'City not found'};
        return {['errorCity' + fromTo]: null};
    }

    handleCitiesEqual(cityFromId, cityToId) {
        if (cityFromId == cityToId) {
            return {errorCityTo: 'Select another city'};
        }
        return {errorCityTo: null};
    }

    filterFlights(flights = this.props.flights) {
        if (flights) return flights
            .filter(el => el.fromCity._id == this.props.selectedCityFrom && el.toCity._id == this.props.selectedCityTo);
        return [];
    }

    canSearch() {
        return this.props.selectedCityFrom && this.props.selectedCityTo && !this.state.errorCityTo;
    }

    _searchFlights() {
        this.setState({flights: this.sort(this.filterFlights())});
        this.props.actions.setFlightsSearched();
    }

    sort(flights, field = this.props.sorting.field, asc = this.props.sorting.asc) {
        switch (field) {
            case 'price':
                return flights.sort(Sorting.byObjectFields(
                    [{field, asc}, {field: 'departTime', type: 'timeStr'}, {field: 'duration', type: 'timeStr'}]
                ));
            case 'duration':
                return flights.sort(Sorting.byObjectFields(
                    [{field, asc}, {field: 'price'}, {field: 'departTime', type: 'timeStr'}]
                ));
            case 'departTime':
                return flights.sort(Sorting.byObjectFields(
                    [{field, asc},  {field: 'price'}, {field: 'duration', type: 'timeStr'}]
                ));
        }
    }

    setFlightsSort(field, asc) {
        let flights = this.sort(this.state.flights, field, asc);
        this.setState({flights});
        this.props.actions.setFlightsSort(field, asc);
    }

    clearSelections(current, prev) {
        return !(current && prev && (current.fromCity._id == prev.fromCity._id) && (current.toCity._id == prev.toCity._id));
    }

    _selectFlight(flight) {
        this.props.actions.selectFlight(flight._id, this.clearSelections(flight, this.selectedFlight));
        this.selectedFlight = flight;
    }

    selectCitiesHeaderHide() {
        return this.canSearch() || this.state.flights.length || this.props.selectedFlight;
    }

    canFinish() {
        return this.selectedFlight && this.selectedFlight.toCity._id == this.props.homeCity;
    }

    render() {
        return (
            <div className="height-100 flight-page">
                <form className="row" style={{display: this.props.cities.length ? 'inherit' : 'none'}}>
                    <Select className="medium-5 columns" error={this.state.errorCityFrom} readOnly={!!this.props.lastCityFrom}
                            id="selectCityFrom" collection={this.props.cities} itemId={this.props.selectedCityFrom}
                            nameField="name" placeholder="Where you want to start" onChange={this.handleCityFromChange}>
                        From city
                    </Select>
                    <Select className="medium-5 columns" error={this.state.errorCityTo} readOnly={!!this.props.lastCityTo}
                            id="selectCityTo" collection={this.props.cities} itemId={this.props.selectedCityTo}
                            nameField="name" placeholder="Where you travel" onChange={this.handleCityToChange}>
                        To city
                    </Select>
                    <div className="medium-2 columns">
                        <Button className="inline-button" onClick={this.searchFlights} disabled={!this.canSearch()}>
                            Search
                        </Button>
                    </div>
                </form>
                <hr/>
                <div className="flights-search">
                    <h3 className={`text-center subheader ${this.selectCitiesHeaderHide() && 'hide' || ''}`}>
                        Select cities to start
                    </h3>
                    <div className={(!this.selectCitiesHeaderHide() || this.props.notSearched) && 'hide' || ''}>
                        <div className="medium-8 columns flights-results">
                            <div>
                                <h4 className="inline">Sort by:</h4>
                                <Sort selected={this.props.sorting.field == 'price'} asc={this.props.sorting.asc}
                                      onClick={asc => this.setFlightsSort('price', asc)}>price</Sort>
                                <Sort selected={this.props.sorting.field == 'duration'} asc={this.props.sorting.asc}
                                      onClick={asc => this.setFlightsSort('duration', asc)}>duration</Sort>
                                <Sort selected={this.props.sorting.field == 'departTime'} asc={this.props.sorting.asc}
                                      onClick={asc => this.setFlightsSort('departTime', asc)}>depart time</Sort>
                            </div>
                            {this.state.flights.length &&
                            <ul className="flights-list">
                                {this.state.flights.map(flight =>
                                        <FlightCard key={flight._id} flight={flight} date={this.props.date}
                                                    onClick={this.selectFlight} />
                                )}
                            </ul> ||
                            <h2 className="subheader">
                                Flights not found
                            </h2>}
                        </div>
                        <div className="medium-4 columns selected-flight">
                            <h4>Current selection</h4>
                            {this.selectedFlight &&
                            <div>
                                <FlightCard flight={this.selectedFlight} small className="selected"
                                             date={this.props.date}/>
                                <Button className="expanded success large" link="/hotel">
                                    Continue
                                </Button>
                                {this.canFinish() &&
                                <Button className="expanded large" link="/summary">
                                    Finish
                                </Button>}
                            </div>||
                            <h5 className="subheader">None selected</h5>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cities: state.city.cities,
        flights: state.flight.flights,
        selectedCityFrom: state.summary.lastCityFrom || state.city.selectedCityFrom,
        selectedCityTo: state.summary.lastCityTo || state.city.selectedCityTo,
        sorting: state.flight.sorting,
        selectedFlight: state.flight.selectedFlight,
        notSearched: state.flight.notSearched,
        date: state.summary.currentStep && state.summary.currentStep.date ||
            (state.summary.steps.length && state.summary.steps[0].dateTo) || state.summary.date,
        homeCity: state.summary.homeCity,
        lastCityFrom: state.summary.lastCityFrom,
        lastCityTo: state.summary.lastCityTo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({selectCity, selectFlight, setFlightsSort, setFlightsSearched}, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Flight);
