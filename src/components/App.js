import React, { Component, PropTypes } from 'react';

class App extends Component {
    static propTypes = {
        children: PropTypes.element
    };

    render() {
        return (
            <div classNme="row">
                <div className="large-12 columns">
                    <div className="panel">
                        <h2>Webpack-React-Redux-Express-Foundation-ES6</h2>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default App;
