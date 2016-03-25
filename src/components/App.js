import React, { Component, PropTypes } from 'react';
import Header from './Header';

class App extends Component {
    static propTypes = {
        children: PropTypes.element,
        location: PropTypes.object
    };

    render() {
        return (
            <div className="row height-100">
                <div className="height-100">
                    <Header location={this.props.location}/>
                    <div className="tabs-content nav-tabs">
                        <div className="tabs-panel is-active height-100">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
