import React, { Component, PropTypes } from 'react';
import DateHelper from '../../util/dateHelper';
import Card from '../Card';

class FlightCard extends Component {
    static propTypes = {
        children: PropTypes.node,
        flight: PropTypes.object,
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
        this.convertDates(props);
    }

    convertDates(props) {
        this.departDate = DateHelper.timeZStrToDate(props.date, props.flight.departTime, 2);
        this.departTimeStr = DateHelper.toTimeStr(this.departDate);
        this.departDateStr = DateHelper.formatDateMonth(this.departDate);
        this.arriveDate = DateHelper.addTimeStr(this.departDate, props.flight.duration);
        this.arriveTimeStr = DateHelper.toTimeStr(this.arriveDate);
        this.arriveDateStr = DateHelper.formatDateMonth(this.arriveDate);
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
                            <div>{flight.fromCityName}</div>
                            <h3>{this.departTimeStr}</h3>
                            <div>{this.departDateStr}</div>
                        </div>
                        <div className="medium-4 columns text-center middle">
                            <div>Duration</div>
                            <h3>{flight.duration}</h3>
                            <div className="text-center">{this.props.flight.available} places available</div>
                        </div>
                        <div className={'columns text-right right ' + (small ? 'medium-6' : 'medium-4')}>
                            <div>{flight.toCityName}</div>
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
