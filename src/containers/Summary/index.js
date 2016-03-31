import React, { Component, PropTypes } from 'react';

class Summary extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div>
                <h1>Summary!</h1>
            </div>
        );
    }
}

export default Summary;
