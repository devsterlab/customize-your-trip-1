import React, { Component, PropTypes } from 'react';
import DateHelper from '../util/dateHelper';

class FlightCard extends Component {
    static propTypes = {
        children: PropTypes.node,
        flight: PropTypes.object,
        cityFrom: PropTypes.object,
        cityTo: PropTypes.object,
        onClick: PropTypes.func,
        small: PropTypes.bool
    };

    componentWillReceiveProps(props) {
        this.departDate = DateHelper.timeZStrToDate(props.flight.departTime, 2);
        this.departTimeStr = DateHelper.toTimeStr(this.departDate);
        this.departDateStr = DateHelper.format(this.departDate);
        this.arriveDate = DateHelper.addTime(this.departDate, props.flight.duration);
        this.arriveTimeStr = DateHelper.toTimeStr(this.arriveDate);
        this.arriveDateStr = DateHelper.format(this.arriveDate);
    }

    render() {
        let {flight, small} = this.props;
        /**
         * Проблемы с датами, не всегда сразу заходят. Если при каждом обновлении компонента нужно
         * обновлять дату, можно это делать на рендеринге
         */
        return (
            <div className={'callout row flight-card ' + (small ? 'small' : '')}
                 onClick={() => this.props.onClick && this.props.onClick(flight)}>
                <div className="medium-4 columns text-center side">
                    <div>Company</div>
                    <h3 className="company-name">{flight.companyName}</h3>
                    <h4 className="price">${flight.price}</h4>
                </div>
                <div className="medium-8 columns">
                    <div className="row">
                        <div className={'columns text-left left ' + (small ? 'medium-6' : 'medium-4')}>
                            <div>{this.props.cityFrom.name}</div>
                            <h3>{this.departTimeStr}</h3>
                            <div>{this.departDateStr}</div>
                        </div>
                        <div className="medium-4 columns text-center middle">
                            <div>Duration</div>
                            <h3>{flight.duration}</h3>
                            <div className="text-center">{this.props.flight.available} places available</div>
                        </div>
                        <div className={'columns text-right right ' + (small ? 'medium-6' : 'medium-4')}>
                            <div>{this.props.cityTo.name}</div>
                            <h3>{this.arriveTimeStr}</h3>
                            <div>{this.arriveDateStr}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FlightCard;
