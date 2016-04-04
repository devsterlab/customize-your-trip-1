import React, { Component, PropTypes } from 'react';

class Item extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        icon: PropTypes.string
    };

    render() {
        let { className, children, icon, ...other } = this.props;
        return (
            <div className={`item row ${className || ''}`} {...other}>
                <div className="side medium-2 columns">
                    <i className={`icon mdi ${icon}`}></i>
                </div>
                {children}
                <div className="line top"/>
                <div className="line bottom"/>
            </div>
        );
    }
}

export default Item;
