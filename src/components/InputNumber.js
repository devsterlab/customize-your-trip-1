import React, { Component, PropTypes } from 'react';

class InputNumber extends Component {
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        value: PropTypes.number,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {value: props.value};
        this.handleChange = this._handleChange.bind(this);
    }

    _handleChange(e) {
        let value = +e.target.value;
        if (value > this.props.max) value = this.props.max;
        else if (value < this.props.min) value = this.props.min;
        if (value != this.state.value) {
            this.setState({value});
            this.props.onChange && this.props.onChange(value);
        }
    }

    render()
    {
        let {min, max, value, onChange, ...other} = this.props;
        return (
            <input type="number"
                   min={min} max={max}
                   value={this.state.value}
                   onChange={this.handleChange}
                {...other}
            />
        );
    }
}

export default InputNumber;
