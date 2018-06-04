import React from 'react';
import {connect} from 'react-redux';
import CustomToolbar from '../components/CustomToolbar';
import Dashboard from "../components/dashboard/Dashboard";

class HomePage extends React.Component {
    render() {
        return (
            <div className={"container-fluid"} style={{padding: 0}}>
                <CustomToolbar/>
                <Dashboard/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, null)(HomePage);