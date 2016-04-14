import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class NavLink extends Component {
    static propTypes = {
        path: PropTypes.string,
        active: PropTypes.bool,
        children: PropTypes.node
    };

    shouldComponentUpdate(props) {
        return props.active != this.props.active;
    }

    render() {
        return (
            <li className="tabs-title">
                <Link to={this.props.path} aria-selected={this.props.active}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}

export default NavLink;
