import React, { Component, PropTypes } from 'react';

class Hotel extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div>
                <h1>Hotel!</h1>
            </div>
        );
    }
}

export default Hotel;
