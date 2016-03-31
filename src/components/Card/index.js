import React, { Component, PropTypes } from 'react';
import Image from '../Image';

class Card extends Component {
    static propTypes = {
        children: PropTypes.node,
        image: PropTypes.string,
        className: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    render() {
        let { children, image, className, price, ...other } = this.props;
        return (
            <div className={`callout row card ${className || ''}`} {...other}>
                {image && <div className="small-4 columns image-wrap">
                    <Image src={image} />
                </div>}
                <div className={`${image && 'small-8' || 'small-12'} columns content`}>
                    {children}
                </div>
                {price && <div className="price text-center">{price}</div>}
            </div>
        );
    }
}

export default Card;
