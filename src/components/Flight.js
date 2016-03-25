import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from './Select';
import Progress from './Progress';

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
        selectedCityFrom: PropTypes.string,
        selectedCityTo: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    handleCityFromChange(city) {

    }

    handleCityToChange(city) {

    }

    render() {
        return (
            <div className="height-100">
                <form className="row" style={{display: this.props.cities.length ? 'inherit' : 'none'}}>
                    <Progress loaded={!!this.props.cities.length} />
                    <Select className="medium-5 columns"
                        id="selectCityFrom" collection={this.props.cities} itemId={this.props.selectedCityFrom}
                        nameField="name" placeholder="Where you want to start" onChange={this.handleCityFromChange}>
                        From city
                    </Select>
                    <Select className="medium-5 columns"
                        id="selectCityTo" collection={this.props.cities} itemId={this.props.selectedCityTo}
                        nameField="name" placeholder="Where you travel" onChange={this.handleCityToChange}>
                        To city
                    </Select>
                    <div className="medium-2 columns">
                        <button type="button" className="button inline-button">Search</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        cities: state.city.cities,
        selectedCityFrom: state.city.selectedCityFrom,
        selectedCityTo: state.city.selectedCityTo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //TODO...
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Flight);
