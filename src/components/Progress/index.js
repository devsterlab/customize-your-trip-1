import React, { Component, PropTypes } from 'react';

class Progress extends Component {
    static propTypes = {
        loaded: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {percent: 0, hide: props.loaded};
        if (!props.loaded) this.intervalId = setInterval(this._incrementProgress.bind(this), 30);
    }

    componentWillReceiveProps(props) {
        if (props.loaded) {
            this.setState({percent: 100});
            clearInterval(this.intervalId);
            setTimeout(this.hideProgress.bind(this), 200);
        }
    }

    shouldComponentUpdate(props, state) {
        return props.loaded !== this.props.loaded
            || state.percent != this.state.percent
            || state.hide != this.state.hide;
    }

    _incrementProgress() {
        if (this.state.percent >= 90) {
            return clearInterval(this.intervalId);
        }
        this.setState({percent: this.state.percent + 0.15});
    }

    hideProgress() {
        this.setState({hide: true});
    }

    render() {
        return (
            <div className="progress load-progress" role="progressbar"
                 style={{display: this.state.hide ? "none" : "inherit"}}>
                <div className="progress-meter" style={{width: this.state.percent + '%'}}></div>
            </div>
        );
    }
}

export default Progress;
