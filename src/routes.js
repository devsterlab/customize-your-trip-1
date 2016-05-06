import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './containers/App';
import Flight from './containers/Flight';
import Hotel from './containers/Hotel';
import Car from './containers/Car';
import Phase4 from './containers/Phase4';
import Summary from './containers/Summary';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Flight}/>
        <Route path="flight" component={Flight}/>
        <Route path="hotel" component={Hotel}/>
        <Route path="car" component={Car}/>
        <Route path="phase4" component={Phase4}/>
        <Route path="summary" component={Summary}/>
        <Redirect from="*" to="flight"/>
    </Route>
);
