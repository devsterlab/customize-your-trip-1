import React, { PropTypes } from 'react';

const propTypes = {
    count: PropTypes.number,
    className: PropTypes.string
};

function Stars(props) {
    let stars = [];
    for (let i = 0; i < props.count; i++) {
        stars.push(<i key={i} className="mdi mdi-star mdi-24px" />);
    }
    return (
        <div className={`stars ${props.className || ''}`}>
            {stars}
        </div>
    );
}

Stars.propTypes = propTypes;

export default Stars;
