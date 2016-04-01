import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flightCity } from '../../reducers';
import * as actions from '../../actions/car';
import DateHelper from '../../util/dateHelper';
import Sorting from '../../util/sorting';
import CarCard from '../../components/CarCard';
import Button from '../../components/Button';
import Sort from '../../components/Sort';
import IconButton from '../../components/IconButton';
import Select from '../../components/Select';
import InputNumber from '../../components/InputNumber';

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
        hotelDays: PropTypes.number,
        carDays: PropTypes.number,
        filters: PropTypes.object
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

        this.selectedCar = props.cars.find(el => el.id == props.selectedCar);
        let filteredCars = this.filter(props.cars, props.filters);
        this.state = {
            cars: this.sort(filteredCars, props.sorting.field, props.sorting.asc),
            brands: this.readAvailableTypes(props.cars, 'brand'),
            models: this.readAvailableTypes(props.cars, 'model'),
            carTypes: this.readAvailableTypes(props.cars, 'carType')
        };

        this.selectCar = this._selectCar.bind(this);
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
                if (car[field] != filters[field]) return false;
            }
            return true;
        });
    }

    setCarsSort(field, asc) {
        let cars = this.sort(this.state.cars, field, asc);
        this.setState({cars});
        this.props.actions.setCarsSort(field, asc);
    }

    _selectCar(car) {
        this.selectedCar = car;
        this.props.actions.selectCar(car && car.id);
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

    setFilter(type, value) {
        if (this.props.filters[type] == (value && value.name)) {
            if (!value) this.setState({['error' + type]: 'Not found'});
            return;
        }
        if (!value) {
            let filters = Object.assign({}, this.props.filters);
            delete filters[type];
            this.setState({['error' + type]: 'Not found', cars: this.sort(this.filter(this.props.cars, filters))});
            this.props.actions.setCarsFilters(filters);
        }
        else {
            let filters = Object.assign({}, this.props.filters, {[type]: value.name});
            this.setState({['error' + type]: null, cars: this.sort(this.filter(this.props.cars, filters))});
            this.props.actions.setCarsFilters(filters);
        }
    }

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
                            ({DateHelper.format(date)} -&nbsp;
                            {DateHelper.format(DateHelper.addDays(date, Math.max(this.props.hotelDays, this.props.carDays)))})
                        </span>
                    </div>
                    <Button className="success float-right large continue-button" link="/summary">
                        {this.selectedCar && 'Continue' || 'Skip'}
                    </Button>
                </div>
                <hr/>
                <div className="row" className="cars-search">
                    <div className="medium-3 columns filtering">
                        <h4>Filtering</h4>
                        <Select nameField="name" error={this.state.errorbrand} clearButton
                                itemName={this.props.filters.brand} collection={this.state.brands}
                                onChange={brand => this.setFilter('brand', brand)}>
                            Brand
                        </Select>
                        <Select nameField="name" error={this.state.errormodel} clearButton
                                itemName={this.props.filters.model} collection={this.state.models}
                                onChange={model => this.setFilter('model', model)}>
                            Model
                        </Select>
                        <Select nameField="name" error={this.state.errorcarType} clearButton
                                itemName={this.props.filters.carType} collection={this.state.carTypes}
                                onChange={carType => this.setFilter('carType', carType)}>
                            Car Type
                        </Select>
                    </div>
                    <div className="medium-5 columns cars-list">
                        <div>
                            <h4 className="inline">Sort by:</h4>
                            <Sort selected={this.props.sorting.field == 'brand'} asc={this.props.sorting.asc}
                                  onClick={asc => this.setCarsSort('brand', asc)}>brand</Sort>
                            <Sort selected={this.props.sorting.field == 'model'} asc={this.props.sorting.asc}
                                  onClick={asc => this.setCarsSort('model', asc)}>model</Sort>
                            <Sort selected={this.props.sorting.field == 'price'} asc={this.props.sorting.asc}
                                  onClick={asc => this.setCarsSort('price', asc)}>price</Sort>
                            <Sort selected={this.props.sorting.field == 'carType'} asc={this.props.sorting.asc}
                                  onClick={asc => this.setCarsSort('carType', asc)}>carType</Sort>
                        </div>
                        {this.state.cars.length && <ul>
                            {this.state.cars.map(car =>
                                <CarCard key={car.id} car={car} onClick={this.selectCar} />
                            )}
                        </ul>
                        ||
                        <h3 className="subheader">Cars not found</h3>}
                    </div>
                    <div className="medium-4 columns">
                        <h4 className="inline">Current selection</h4>
                        {this.selectedCar &&
                        <IconButton className="mdi-close-circle float-right clear-selection" title="Clear selection"
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
                        <h5 className="subheader">None selected</h5>}
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
        cars: city && state.car.cars.filter(el => el.city == city.id) || [],
        selectedHotel: state.hotel.selectedHotel,
        selectedCar: state.car.selectedCar,
        sorting: state.car.sorting,
        hotelDays: state.hotel.days,
        carDays: state.car.days,
        filters: state.car.filters
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
