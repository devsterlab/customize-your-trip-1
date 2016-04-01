import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectCity } from '../../actions/city';
import { selectFlight, setFlightsSort } from '../../actions/flight';
import Sorting from '../../util/sorting';
import Select from '../../components/Select';
import Progress from '../../components/Progress/Progress';
import FlightCard from '../../components/FlightCard';
import Sort from '../../components/Sort';
import Button from '../../components/Button';

class Flight extends Component {
    static propTypes = {
        children: PropTypes.node,
        cities: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            bounds: PropTypes.shape({
                south: PropTypes.number, west: PropTypes.number,
                north: PropTypes.number, east: PropTypes.number}),
            timezone: PropTypes.number
        })),
        flights: PropTypes.arrayOf(PropTypes.shape({
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
        })),
        selectedCityFrom: PropTypes.string,
        selectedCityTo: PropTypes.string,
        sorting: PropTypes.shape({
            field: PropTypes.string,
            asc: PropTypes.bool
        }),
        selectedFlight: PropTypes.string,
        actions: PropTypes.object
    };

    static defaultProps = {
        sorting: {
            field: 'departTime',
            asc: true
        }
    };

    constructor(props) {
        super(props);

        this.selectedFlight = props.flights.find(el => el.id == props.selectedFlight);
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
        if (city && otherCity) Object.assign(state, this.handleCitiesEqual(city.id, otherCity));
        this.setState(state);
        this.props.actions.selectCity(city && city.id, from);
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
            .filter(el => el.fromCity == this.props.selectedCityFrom && el.toCity == this.props.selectedCityTo);
        return [];
    }

    canSearch() {
        return this.props.selectedCityFrom && this.props.selectedCityTo && !this.state.errorCityTo;
    }

    _searchFlights() {
        this.setState({flights: this.sort(this.filterFlights())});
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

    _selectFlight(flight) {
        this.selectedFlight = flight;
        this.props.actions.selectFlight(flight.id);
    }

    render() {
        return (
            <div className="height-100 flight-page">
                <Progress loaded={!!this.props.cities.length} />
                <form className="row" style={{display: this.props.cities.length ? 'inherit' : 'none'}}>
                    <Select className="medium-5 columns" error={this.state.errorCityFrom}
                        id="selectCityFrom" collection={this.props.cities} itemId={this.props.selectedCityFrom}
                        nameField="name" placeholder="Where you want to start" onChange={this.handleCityFromChange}>
                        From city
                    </Select>
                    <Select className="medium-5 columns" error={this.state.errorCityTo}
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
                    <h3 className={'text-center subheader ' +
                        (this.canSearch() || this.state.flights.length || this.props.selectedFlight ? 'hide' : '')}>
                        Select cities to start
                    </h3>
                    <div className="row" className={!this.state.flights.length && !this.props.selectedFlight && 'hide'}>
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
                            <h2 className={`subheader ${this.state.flights.length && 'hide' || ''}`}>
                                Flights not found
                            </h2>
                            <ul className="flights-list">
                                {this.state.flights.map(flight =>
                                    <FlightCard key={flight.id} flight={flight} onClick={this.selectFlight} />
                                )}
                            </ul>
                        </div>
                        <div className="medium-4 columns selected-flight">
                            <h4>Current selection</h4>
                            {this.selectedFlight &&
                            [<FlightCard key="0" flight={this.selectedFlight} small className="selected" />,
                             <Button key="1" className="expanded success large" link="/hotel">
                                 Continue
                             </Button>] ||
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
        selectedCityFrom: state.city.selectedCityFrom,
        selectedCityTo: state.city.selectedCityTo,
        sorting: state.flight.sorting,
        selectedFlight: state.flight.selectedFlight
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({selectCity, selectFlight, setFlightsSort}, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Flight);
