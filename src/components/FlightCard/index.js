import React, { Component, PropTypes } from 'react';
import DateHelper from '../../util/dateHelper';
import Card from '../Card';

class FlightCard extends Component {
    static propTypes = {
        flight: PropTypes.shape({
            _id: PropTypes.string,
            fromCity: PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string,
                timezone: PropTypes.string
            }),
            toCity: PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string,
                timezone: PropTypes.string
            }),
            companyName: PropTypes.string,
            available: PropTypes.number,
            price: PropTypes.number,
            departTime: PropTypes.string,
            duration: PropTypes.number
        }),
        onClick: PropTypes.func,
        small: PropTypes.bool,
        className: PropTypes.string,
        date: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.convertDates(props);
    }

    componentWillReceiveProps(props) {
        if (props.flight !== this.props.flight) this.convertDates(props);
    }

    shouldComponentUpdate(props) {
        return props.flight !== this.props.flight
            || props.className !== this.props.className;
    }

    convertDates(props) {
        this.departDate = DateHelper.timeZStrToDate(props.date, props.flight.departTime, props.flight.fromCity.timezone);
        this.departTimeStr = DateHelper.toTimeStr(this.departDate);
        this.departDateStr = DateHelper.formatDateMonth(this.departDate);
        this.arriveDate = DateHelper.addMinutesZ(this.departDate, props.flight.duration, props.flight.toCity.timezone);
        this.arriveTimeStr = DateHelper.toTimeStr(this.arriveDate);
        this.arriveDateStr = DateHelper.formatDateMonth(this.arriveDate);
        this.durationStr = DateHelper.formatDuration(props.flight.duration);
    }

    render() {
        let {flight, small} = this.props;
        return (
            <Card className={`flight-card ${this.props.className || ''} ${small && 'small' || ''}`}
                 onClick={() => this.props.onClick && this.props.onClick(flight)}>
                <div className="medium-4 columns text-center side">
                    <div>Company</div>
                    <h3 className="company-name">{flight.companyName}</h3>
                    <h4 className="price">${flight.price}</h4>
                </div>
                <div className="medium-8 columns">
                    <div className="row">
                        <div className={'columns text-left left ' + (small ? 'medium-6' : 'medium-4')}>
                            <div><i className="mdi mdi-secondary mdi-airplane-takeoff" /> {flight.fromCity.name}</div>
                            <h3>{this.departTimeStr}</h3>
                            <div>{this.departDateStr}</div>
                        </div>
                        <div className="medium-4 columns text-center middle">
                            <div>Duration</div>
                            <h3>{this.durationStr}</h3>
                            <div className="text-center">{this.props.flight.available} places available</div>
                        </div>
                        <div className={'columns text-right right ' + (small ? 'medium-6' : 'medium-4')}>
                            <div>{flight.toCity.name} <i className="mdi mdi-secondary mdi-airplane-landing" /></div>
                            <h3>{this.arriveTimeStr}</h3>
                            <div>{this.arriveDateStr}</div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default FlightCard;
