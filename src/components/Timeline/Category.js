import React, { Component, PropTypes } from 'react';

class Category extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    };

    render() {
        let { className, children, ...other } = this.props;
        return (
            <div className={`category ${className || ''}`} {...other}>
                {children}
            </div>
        );
    }
}

export default Category;