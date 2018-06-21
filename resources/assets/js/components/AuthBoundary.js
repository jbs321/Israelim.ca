import React from 'react';
import {connect} from 'react-redux';
import {fetchAuth} from "../actions/Auth";

class AuthBoundary extends React.Component {
    componentDidMount() {
        this.props.fetchAuth();
    }

    render() {
        //handle Autherized here or continue
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {fetchAuth})(AuthBoundary);