import React from 'react';
import {connect} from 'react-redux';

export const style = {
    border: "1px solid black"
};

class State extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.state.open = false;
    }

    toggleView() {
        const {open} = this.state;
        this.setState({
            open: !open
        });
    }

    renderProps() {
        let listItems = [];
        let items = JSON.stringify(this.props);

        items = items.slice(1, -1);
        items = items.split(",");

        if (items.length == 0) {
            return null;
        }

        for (let key in items) {
            let pair = items[key].split(":");
            listItems[key] = <tr key={key}>
                <td style={{padding: 5}}><b>{pair[0]}:</b></td>
                <td style={{padding: 5}}>{pair[1]}</td>
            </tr>;
        }

        return (
            <table style={style}>
                <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {listItems}
                </tbody>
            </table>
        );
    }

    render() {
        const bottom = this.state.open ? 5 : -470;
        const style = {width: 300, height:500,overflowY:"scroll", position: "fixed", bottom: bottom, left: 5, backgroundColor:'grey'};
        return (
            <div style={style}>
                <button style={{position: "absolute", top: 0}} onClick={this.toggleView.bind(this)}>{this.state.open ? "close" : "open"}</button>
                {this.renderProps()}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, null)(State);