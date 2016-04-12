import React, { Component, PropTypes } from 'react';
import history from '../util/history';

class Button extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        link: PropTypes.string,
        onClick: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleOnClick = this._handleOnClick.bind(this);
    }

    _handleOnClick(e) {
        this.props.onClick && this.props.onClick(e);
        this.props.link && history.push(this.props.link);
    }

    render() {
        let { className, children, link, onClick, ...other } = this.props;
        return (
            <button type="button" className={`button ${className || ''}`} onClick={this.handleOnClick} {...other}>
                { children }
            </button>
        );
    }
}

export default Button;
