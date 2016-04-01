import React, { PropTypes } from 'react';

const propTypes = {
    className: PropTypes.string
};

function IconButton(props) {
    let { className, ...other } = props;
    return (
        <i className={`mdi mdi-24px icon-button ${className || ''}`} {...other}/>
    );
}

IconButton.propTypes = propTypes;

export default IconButton;
