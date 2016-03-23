import React, { Component, PropTypes } from 'react';

class Flight extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div>
                <h1>Flight!</h1>
            </div>
        );
    }
}

export default Flight;
