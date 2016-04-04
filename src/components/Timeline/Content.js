import React, { Component, PropTypes } from 'react';

class Content extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    };

    render() {
        let { className, children, ...other } = this.props;
        return (
            <div className={`content medium-8 columns ${className || ''}`} {...other}>
                {children}
            </div>
        );
    }
}

export default Content;
