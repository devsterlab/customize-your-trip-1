import React, { Component, PropTypes } from 'react';

class Actions extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    };

    render() {
        let { className, children, ...other } = this.props;
        return (
            <div className={`actions medium-2 columns ${className || ''}`} {...other}>
                {children}
            </div>
        );
    }
}

export default Actions;
