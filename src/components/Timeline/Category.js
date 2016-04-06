import React, { Component, PropTypes } from 'react';

class Category extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    };

    render() {
        let { className, children, ...other } = this.props;
        let noItems = (children.type || (children.length == 2 && children[1] == false)) && 'no-items' || '';
        return (
            <div className={`category ${className || ''} ${noItems}`} {...other}>
                {children}
            </div>
        );
    }
}

export default Category;
