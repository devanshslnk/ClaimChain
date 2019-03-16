import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from '../components/HEADER/Header';

const Routes=()=>{
    <Switch>
        <Route exact path="/" component={Header}/>
    </Switch>
}

export default Routes;