import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';

class Image extends Component {
    static propTypes = {
        className: PropTypes.string,
        src: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {imageStatus: null};
        this.handleImageLoaded = this._handleImageLoaded.bind(this);
        this.handleImageError = this._handleImageError.bind(this);
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
                <Spinner className={this.state.imageStatus != null && 'hide' || ''}/>
            </div>
        );
    }
}

export default Image;
