import React, { Component, PropTypes } from 'react';

class Car extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div>
                <h1>Car!</h1>
            </div>
        );
    }
}

export default Car;
