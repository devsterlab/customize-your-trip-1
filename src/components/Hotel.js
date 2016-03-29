import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TripMap from './TripMap';
import HotelCard from './HotelCard';

class Hotel extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div className="height-100">
                <div className=""><h3>Choose hotel</h3></div>
                <hr/>
                <div className="row hotels-search">
                    <div className="medium-7 columns map-wrap">
                        <TripMap />
                    </div>
                    <div className="medium-5 columns">
                        <ul className="hotels-list">
                        {this.props.hotels.map((hotel, index) =>
                            <HotelCard className={`${index == this.props.hotels.length - 1 && 'last' || ''}`}
                                       key={hotel.id} hotel={hotel} />
                        )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        hotels: state.hotel.hotels.filter(el => el.city == state.city.selectedCityTo)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Hotel);
