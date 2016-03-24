import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class App extends Component {
    static propTypes = {
        children: PropTypes.element
    };

    render() {
        return (
            <div className="row height-100">
                <div className="height-100">
                    <ul className="tabs"  style={{textAlign: 'center'}}>
                        <div style={{display: 'inline-block'}}>
                        <li className="tabs-title"><Link to="/flight" aria-selected="true">Flight</Link></li>
                        <li className="tabs-title is-active"><Link to="/hotel">Hotel</Link></li>
                        <li className="tabs-title"><Link to="/car">Car</Link></li>
                        <li className="tabs-title"><Link to="/phase4">Phase 4</Link></li>
                        <li className="tabs-title"><Link to="/summary">Summary</Link></li>
                        </div>
                    </ul>
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
