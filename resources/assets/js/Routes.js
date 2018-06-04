import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from "./page/home";
import ProfilePage from "./page/ProfilePage";

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/profile" component={ProfilePage}/>
                <Route exact path="/" component={HomePage}/>
            </Switch>
        );
    }
}