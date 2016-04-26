import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';

class Image extends Component {
    static propTypes = {
        className: PropTypes.string,
        src: PropTypes.string,
        spinnerParent: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {imageStatus: null};
        this.handleImageLoaded = this._handleImageLoaded.bind(this);
        this.handleImageError = this._handleImageError.bind(this);
    }

    shouldComponentUpdate(props, state) {
        return props.src !== this.props.src
            || state.imageStatus !== this.state.imageStatus;
    }

    _handleImageLoaded() {
        this.setState({imageStatus: true});
    }

    _handleImageError() {
        this.setState({imageStatus: false});
    }

    render()
    {
        return (
            <div className={`image ${this.props.className || ''}`}>
                <img src={this.props.src} onLoad={this.handleImageLoaded} onError={this.handleImageError}/>
                {this.state.imageStatus == null && <Spinner parent={this.props.spinnerParent}/>}
            </div>
        );
    }
}

export default Image;
