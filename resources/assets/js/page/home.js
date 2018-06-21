import React from 'react';
import {connect} from 'react-redux';
import ButtonAppBar from '../components/ButtonAppBar';

class HomePage extends React.Component {
    render() {
        return (
            <div className={"container-fluid"} style={{padding: 0}}>
                <ButtonAppBar/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, null)(HomePage);