import React, { Component, PropTypes } from 'react';

class Modal extends Component {
    static propTypes = {
        children: PropTypes.node,
        onShow: PropTypes.func,
        onClose: PropTypes.func,
        className: PropTypes.string,
        show: PropTypes.bool,
        closeButton: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {show: props.show};
        if (props.show) props.onShow && props.onShow();
    }

    componentWillReceiveProps(props) {
        if (props.show != this.state.show) {
            this.setState({show: props.show});
            if (!props.show) props.onClose && props.onClose();
            else props.onShow && props.onShow();
        }
    }

    close() {
        this.setState({show: false});
        this.props.onClose && this.props.onClose();
    }

    render() {
        let show = this.state.show && 'show' || '';
        return (
            <div className={`modal-overlay ${show}`}>
                <div className={`reveal ${this.props.className || ''} ${show}`}>
                    {this.state.show &&
                    <div>
                        {this.props.children}
                        {this.props.closeButton &&
                        <button className="close-button" type="button" onClick={() => this.close()}>
                            <span aria-hidden="true">&times;</span>
                        </button>}
                    </div>}
                </div>
            </div>
        );
    }
}

export default Modal;
