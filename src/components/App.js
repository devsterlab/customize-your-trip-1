import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class App extends Component {
    static propTypes = {
        children: PropTypes.element
    };

    render() {
        return (
            <div classNme="row">
                <div className="large-offset-2 large-8 medium-offset-1 medium-10 columns">
                    <ul className="tabs"  style={{textAlign: 'center'}}>
                        <div style={{display: 'inline-block'}}>
                        <li className="tabs-title"><Link to="/flight" aria-selected="true">Flight</Link></li>
                        <li className="tabs-title is-active"><Link to="/hotel">Hotel</Link></li>
                        <li className="tabs-title"><Link to="/car">Car</Link></li>
                        <li className="tabs-title"><Link to="/phase4">Phase 4</Link></li>
                        <li className="tabs-title"><Link to="/summary">Summary</Link></li>
                        </div>
                    </ul>
                    <div className="tabs-content">
                        <div className="tabs-panel is-active">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
