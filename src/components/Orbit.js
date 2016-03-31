import React, { Component, PropTypes } from 'react';
import Image from './Image';

class Orbit extends Component {
    static propTypes = {
        children: PropTypes.node,
        images: PropTypes.arrayOf(PropTypes.string),
        onImageChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedImage: 0
        };
    }

    changeImage(inc) {
        let index = this.state.selectedImage + inc;
        if (index < 0) index = this.props.images.length - 1;
        else if (index == this.props.images.length) index = 0;
        this.setState({
            selectedImage: index
        });
    }

    render() {
        let { selectedImage } = this.state;
        return (
            <div className="orbit" role="region">
                <ul className="orbit-container">
                    <button className="orbit-previous" onClick={() => this.changeImage(-1)}>
                        <span className="show-for-sr">Previous</span>&#9664;&#xFE0E;
                    </button>
                    <button className="orbit-next" onClick={() => this.changeImage(1)}>
                        <span className="show-for-sr">Next</span>&#9654;&#xFE0E;
                    </button>
                    {this.props.images.map((image, index) =>
                        <li key={index} className={`orbit-slide ${index != selectedImage && 'hide' || ''}`}>
                            <Image src={this.props.images[index]} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Orbit;
