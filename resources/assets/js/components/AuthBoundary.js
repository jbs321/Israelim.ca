import React from 'react';
import {connect} from 'react-redux';
import {fetchAuth} from "../actions/Auth";
import Login from "../form/Login";
import {Switch, Route} from 'react-router-dom';
import Welcome from "../page/welcome";
import Register from "../form/Register";

class AuthBoundary extends React.Component {
    componentDidMount() {
        this.props.fetchAuth();
    }

    render() {
        const {isAuth} = this.props;

        if (!isAuth) {
            return (
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route exact path="/" component={Welcome}/>
                </Switch>
            );
        }

        return this.props.children;
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {fetchAuth})(AuthBoundary);