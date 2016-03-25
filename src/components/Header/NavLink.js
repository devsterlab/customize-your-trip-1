import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
    path: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.node
};

function NavLink(props) {
    return (
        <li className="tabs-title">
            <Link to={props.path} aria-selected={props.active}>{props.children}</Link>
        </li>
    );
}

NavLink.propTypes = propTypes;

export default NavLink;
