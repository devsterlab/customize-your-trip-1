import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Progress from '../components/Progress';

class App extends Component {
    static propTypes = {
        children: PropTypes.element,
        location: PropTypes.object,
        loaded: PropTypes.bool
    };

    render() {
        return (
            <div className="row height-100">
                <div className="height-100">
                    <Header location={this.props.location}/>
                    <div className="tabs-content nav-tabs">
                        <div className="tabs-panel is-active height-100">
                            <Progress loaded={this.props.loaded} />
                            {this.props.loaded && this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loaded: !!(state.city.cities.length
                && state.flight.flights.length
                && state.hotel.hotels.length
                && state.car.cars.length)
    };
}

export default connect(mapStateToProps)(App);
