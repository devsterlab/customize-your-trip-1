import React, { Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom';
import DOM from '../../util/dom';

class Spinner extends Component {
    static propTypes = {
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.spinner = findDOMNode(this);
        this.hotelsList = $('.hotels-list');
        DOM.onVisibilityChange(this.spinner, this.hotelsList, visible => this.setState({visible}))
    }

    componentWillUnmount() {
        DOM.offVisibilityChange(this.spinner, this.hotelsList);
    }

    shouldComponentUpdate(props, state) {
        return state.visible != this.state.visible;
    }

    render() {
        return (
            <div className={`sk-circle ${this.props.className || ''}`}>
                {this.state.visible &&
                [<div className="sk-circle1 sk-child" key={0} />,
                <div className="sk-circle2 sk-child" key={1} />,
                <div className="sk-circle3 sk-child" key={2} />,
                <div className="sk-circle4 sk-child" key={3} />,
                <div className="sk-circle5 sk-child" key={4} />,
                <div className="sk-circle6 sk-child" key={5} />,
                <div className="sk-circle7 sk-child" key={6} />,
                <div className="sk-circle8 sk-child" key={7} />,
                <div className="sk-circle9 sk-child" key={8} />,
                <div className="sk-circle10 sk-child" key={9} />,
                <div className="sk-circle11 sk-child" key={10} />,
                <div className="sk-circle12 sk-child" key={11} />]}
            </div>
        );
    };
}

export default Spinner;
