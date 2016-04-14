import React, { Component, PropTypes } from 'react';

class Stars extends Component {
    static propTypes = {
        count: PropTypes.number,
        className: PropTypes.string
    };

    shouldComponentUpdate(props) {
        return props.count !== this.props.count;
    }

    render() {
        let stars = [];
        for (let i = 0; i < this.props.count; i++) {
            stars.push(<i key={i} className="mdi mdi-star mdi-24px"/>);
        }
        return (
            <div className={`stars ${this.props.className || ''}`}>
                {stars}
            </div>
        );
    }
}

export default Stars;
