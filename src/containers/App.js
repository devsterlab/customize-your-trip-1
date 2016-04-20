import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Progress from '../components/Progress';

class App extends Component {
    static propTypes = {
        children: PropTypes.element,
        location: PropTypes.object,
        connected: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row height-100">
                <div className="height-100">
                    <Header location={this.props.location}/>
                    <div className="tabs-content nav-tabs">
                        <div className="tabs-panel is-active height-100">
                            <Progress loaded={this.props.connected} />
                            {this.props.connected && this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        connected: state.summary.connected
    };
}

export default connect(mapStateToProps)(App);
