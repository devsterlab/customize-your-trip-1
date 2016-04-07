import React, { Component, PropTypes } from 'react';
import Button from '../../components/Button';

class Actions extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        onEdit: PropTypes.func,
        onRemove: PropTypes.func
    };

    render() {
        let { className, children, onEdit, onRemove, ...other } = this.props;
        return (
            <div className={`actions medium-2 columns ${className || ''}`} {...other}>
                <Button className="edit" onClick={onEdit}>
                    <i className="mdi mdi-pencil mdi-24px"/><span>Edit</span>
                </Button>
                <div className="remove" onClick={onRemove}>
                    <i className="mdi mdi-close"/><div>Remove</div>
                </div>
                {children}
            </div>
        );
    }
}

export default Actions;
