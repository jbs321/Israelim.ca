import React from 'react';
import {connect} from "react-redux";
import {fetchSugarChart} from '../actions/Sugar'
import LineChart from "../chartjs/line";

class SugarStatistics extends React.Component {
    componentDidMount() {
        this.props.fetchSugarChart();
    }

    render() {
        const {sugar} = this.props;

        const data = sugar.map((log) => {
            return log.sugarLevel;
        });

        const labels = sugar.map((log) => {
            return log.created_at.slice(0,10);
        });

        return (
            <div className={"sugarStatistics"}>
                <LineChart data={data} labels={labels} label={"asdads"}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {fetchSugarChart})(SugarStatistics);