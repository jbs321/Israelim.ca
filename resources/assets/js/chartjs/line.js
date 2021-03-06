import React from 'react';
import {Line} from 'react-chartjs-2';

export default class LineChart extends React.Component {

    render() {
        const {data, labels, label} =  this.props;

        if(data == undefined) {
            throw new Error("Missing Data")
        }

        if(data.length == 0) {
            return <div>Loading...</div>
        }

        return (
            <Line data={{
                labels,
                datasets: [
                    {
                        label,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data
                    }
                ]
            }}/>
        );
    }
}



