import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Flight from './components/Flight';
import Hotel from './components/Hotel';
import Car from './components/Car';
import Phase4 from './components/Phase4';
import Summary from './components/Summary';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Flight}/>
        <Route path="flight" component={Flight}/>
        <Route path="hotel" component={Hotel}/>
        <Route path="car" component={Car}/>
        <Route path="phase4" component={Phase4}/>
        <Route path="summary" component={Summary}/>
        <Route path="*" component={Flight}/>
    </Route>
);
