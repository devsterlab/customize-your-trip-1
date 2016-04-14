import React, { Component, PropTypes } from 'react';
import NavLink from './NavLink';

class Header extends Component {
    static propTypes = {
        navList: PropTypes.arrayOf(PropTypes.shape({
            path: PropTypes.string,
            name: PropTypes.string
        })),
        children: PropTypes.element,
        location: PropTypes.object
    };

    static defaultProps = {
        navList: [
            {path: '/flight', name: 'Flight'},
            {path: '/hotel', name: 'Hotel'},
            {path: '/car', name: 'Car'},
            //{path: '/phase4', name: 'Phase 4'},
            {path: '/summary', name: 'Summary'} ]
    };

    shouldComponentUpdate(props) {
        return props.location.pathname !== this.props.location.pathname;
    }

    isActive(path) {
        const pathname = this.props.location.pathname;
        return pathname === '/' && (pathname === path || path === '/flight')
            || path !== '/' && pathname.includes(path);
    }

    render() {
        return (
            <ul className="tabs" style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block'}}>
                    {this.props.navList.map((navItem, key) =>
                        <NavLink key={key} path={navItem.path} active={this.isActive(navItem.path)}>
                            {navItem.name}
                        </NavLink>
                    )}
                </div>
            </ul>
        );
    }
}

export default Header;
