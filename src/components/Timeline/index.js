import React, { Component, PropTypes } from 'react';

class Timeline extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div className="timeline">
                {this.props.children}
            </div>
        );
    }
}

export default Timeline;
