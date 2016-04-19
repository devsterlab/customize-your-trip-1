import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flightCity } from '../../reducers';
import * as actions from '../../actions/car';
import DateHelper from '../../util/dateHelper';
import Sorting from '../../util/sorting';
import CarCard from '../../components/CarCard';
import Button from '../../components/Button';
import CarsSort from './CarsSort';
import IconButton from '../../components/IconButton';
import Filtering from './Filtering';
import InputNumber from '../../components/InputNumber';

class Car extends Component {
    static propTypes = {
        children: PropTypes.node,
        city: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            bounds: PropTypes.shape({
                south: PropTypes.number, west: PropTypes.number,
                north: PropTypes.number, east: PropTypes.number}),
            timezone: PropTypes.string
        }),
        cars: PropTypes.array,
        selectedHotel: PropTypes.string,
        selectedCar: PropTypes.string,
        sorting: PropTypes.object,
        hotelDays: PropTypes.number,
        carDays: PropTypes.number,
        filters: PropTypes.object,
        date: PropTypes.object
    };

    static defaultProps = {
        city: {
            bounds: {}
        },
        sorting: {
            field: 'price'
        },
        filters: {},
        maxDays: 99
    };

    constructor(props) {
        super(props);

        this.selectedCar = props.cars.find(el => el._id == props.selectedCar);
        let filteredCars = this.filter(props.cars, props.filters);
        this.state = {
            brands: this.readAvailableTypes(props.cars, 'brand'),
            models: this.readAvailableTypes(filteredCars, 'model'),
            carTypes: this.readAvailableTypes(props.cars, 'carType'),
            cars: this.sort(filteredCars, props.sorting.field, props.sorting.asc)
        };

        this.selectCar = this._selectCar.bind(this);
        this.handleSortChange = this._handleSortChange.bind(this);
        this.handleFilterChange = this._handleFilterChange.bind(this);
    }

    sort(cars, field = this.props.sorting.field, asc = this.props.sorting.asc) {
        switch (field) {
            case 'brand':
                return cars.sort(Sorting.byObjectFields(
                    [{field, asc}, {field: 'model'}, {field: 'price'}]
                ));
            case 'model':
                return cars.sort(Sorting.byObjectFields(
                    [{field, asc}, {field: 'brand'}, {field: 'price'}]
                ));
            case 'price':
                return cars.sort(Sorting.byObjectFields(
                    [{field, asc}, {field: 'brand'}, {field: 'model'}]
                ));
            case 'carType':
                return cars.sort(Sorting.byObjectFields(
                    [{field, asc}, {field: 'price'}, {field: 'brand'}]
                ));
        }
    }

    filter(cars, filters) {
        if (!(filters && Object.keys(filters).length)) return cars;
        return cars.filter(car => {
            for (let field in filters) {
                if (field == 'transmission') {
                    if (!filters[field][car[field]]) return false;
                }
                else if (car[field] != filters[field]) return false;
            }
            return true;
        });
    }

    _handleSortChange(field, asc) {
        let cars = this.sort(this.state.cars, field, asc);
        this.setState({cars});
        this.props.actions.setCarsSort(field, asc);
    }

    _selectCar(car) {
        this.selectedCar = car;
        this.props.actions.selectCar(car && car._id);
    }

    readAvailableTypes(cars, field) {
        let keys = {}, res = [];
        for (let car of cars) {
            if (!keys[car[field]]) {
                keys[car[field]] = 1;
                res.push({name: car[field]});
            }
        }
        return res;
    }

    _handleFilterChange(type, value) {
        if (this.props.filters[type] == (value && value.name)) {
            if (!value) this.setState({['error' + type]: 'Not found'});
            return;
        }
        let filters = Object.assign({}, this.props.filters), state;
        if (!value) {
            delete filters[type];
            state = {['error' + type]: 'Not found'};
        }
        else {
            Object.assign(filters, {[type]: value.name});
            state = {['error' + type]: null};
        }
        state.cars = this.sort(this.filter(this.props.cars, filters));
        if (this.props.filters.brand != filters.brand) {
            let withoutModelFilters = Object.assign({}, filters);
            delete withoutModelFilters.model;
            let modelCars = this.filter(this.props.cars, withoutModelFilters);
            state.models = this.readAvailableTypes(modelCars, 'model');
            delete filters.model;
        }
        this.setState(state);
        this.props.actions.setCarsFilters(filters);
    }

    render() {
        return (
            this.props.selectedHotel &&
            <div className="height-100">
                <div className="car-header">
                    <div className="inline">
                        <h3>{this.props.city.name}</h3>
                        <span>
                            Day 1-{this.props.hotelDays}&nbsp;
                            ({DateHelper.formatDateMonth(this.props.date)} -&nbsp;
                            {DateHelper.formatDateMonth(DateHelper.addDays(this.props.date, Math.max(this.props.hotelDays, this.props.carDays)))})
                        </span>
                    </div>
                    <Button className="success float-right large continue-button" link="/summary">
                        {this.selectedCar && 'Continue' || 'Skip'}
                    </Button>
                </div>
                <hr/>
                <div className="row" className="cars-search">
                    <Filtering filters={this.props.filters} brands={this.state.brands} models={this.state.models}
                               carTypes={this.state.carTypes} errorbrand={this.state.errorbrand}
                               errormodel={this.state.errormodel} errorcarType={this.state.errorcarType}
                               onFilterChange={this.handleFilterChange} />
                    <div className="medium-5 columns cars-list">
                        <CarsSort sorting={this.props.sorting} onSortChange={this.handleSortChange} />
                        {this.state.cars.length && <ul>
                            {this.state.cars.map(car =>
                                <CarCard key={car._id} car={car} onClick={this.selectCar} />
                            )}
                        </ul>
                        ||
                        <h3 className="subheader">Cars not found</h3>}
                    </div>
                    <div className="medium-4 columns selection">
                        <h4 className="inline">Current selection</h4>
                        {this.selectedCar &&
                        <IconButton className="mdi-close-circle float-right clear" title="Clear selection"
                                    onClick={() => this.selectCar(null)}/>}
                        {this.selectedCar &&
                        <div>
                            <CarCard car={this.selectedCar} className="selected"
                                     price={this.props.carDays * this.selectedCar.price}/>
                            <div className="inline days float-right ">
                                <span>Days to drive:</span>
                                <InputNumber className="inline" min={1} max={this.props.maxDays}
                                             value={this.props.carDays}
                                             onChange={(num) => this.props.actions.setCarDays(num)} />
                            </div>
                        </div>
                        ||
                        <h3 className="subheader">None selected</h3>}
                    </div>
                </div>
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
        cars: city && state.car.cars.filter(el => el.city._id == city._id) || [],
        selectedHotel: state.hotel.selectedHotel,
        selectedCar: state.car.selectedCar,
        sorting: state.car.sorting,
        hotelDays: state.hotel.days,
        carDays: state.car.days,
        filters: state.car.filters,
        date: state.summary.date
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Car);
