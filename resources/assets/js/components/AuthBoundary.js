import React from 'react'
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {fetchAuth} from "../actions/Auth"
import {NotProtectedRoutes} from "../Routes"

class AuthBoundary extends React.Component {
    componentDidMount() {
        this.props.fetchAuth();
    }

    render() {
        const {isAuth, children} = this.props;

        return isAuth ? children : <NotProtectedRoutes/>;
    }
}

AuthBoundary.propTypes = {
    isAuth: PropTypes.bool.isRequired,
};

const enhance = compose(
    connect(state => state, {fetchAuth})
)(AuthBoundary);

export default enhance;