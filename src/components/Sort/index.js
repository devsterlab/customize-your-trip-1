import React, { Component, PropTypes } from 'react';

class Sort extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        onClick: PropTypes.func,
        selected: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.handleClick = this._handleClick.bind(this);
        this.state = {asc: false};
    }

    _handleClick() {
        let asc = this.state.asc;
        if (this.props.selected) asc = !asc;
        this.setState({asc: asc});
        this.props.onClick && this.props.onClick(asc);
    }

    render() {
        return (
            <div className={'sort inline ' + this.props.className} onClick={this.handleClick}>
                <h5 className={this.props.selected ? '' : 'disabled'}>{this.props.children}
                    <i className={'mdi ' + (this.state.asc ? 'mdi-chevron-up' : 'mdi-chevron-down')} />
                </h5>
            </div>
        );
    }
}

export default Sort;
