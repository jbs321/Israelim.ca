import React from 'react';
import AppBar from './AppBar';

const withAppBar = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <div className={"container-fluid p-0"}>
                    <AppBar/>


                    <Component {...this.props}/>
                </div>
            );
        }
    };
};


export default withAppBar;