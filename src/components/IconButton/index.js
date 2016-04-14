import React, { Component, PropTypes } from 'react';

class IconButton extends Component {
    static propTypes = {
        className: PropTypes.string
    };

    shouldComponentUpdate(props) {
        return props.className != this.props.className;
    }

    render() {
        let { className, ...other } = this.props;
        return (
            <i className={`mdi mdi-24px icon-button ${className || ''}`} {...other}/>
        );
    }
}

export default IconButton;
