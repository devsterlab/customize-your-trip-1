import React, { Component, PropTypes } from 'react';
import DateHelper from '../../util/dateHelper';

class Title extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        date: PropTypes.object,
        secondary: PropTypes.node,
        icon: PropTypes.string
    };

    render() {
        let { date, children, secondary, className, icon, ...other } = this.props;
        return (
            <div className={`title row ${className || ''}`} {...other}>
                <div className="side medium-2 columns">
                    <i className={`icon mdi ${icon || ''} mdi-24px`}></i>
                    <div className="date">
                        <div className="day">{DateHelper.zerofy(date.getDate())}</div>
                        <div className="month">{DateHelper.shortMonth(date)}</div>
                    </div>
                </div>
                <div className="content medium-10 columns">
                    <div className="name">{children}</div>
                    <div className="secondary">{secondary}</div>
                </div>
                <div className="line"/>
            </div>
        );
    }
}

export default Title;
