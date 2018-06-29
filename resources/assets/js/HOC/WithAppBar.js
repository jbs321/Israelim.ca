import React from 'react';
import AppBar from '../components/AppBar';

const withAppBar = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <div className={"container-fluid p-0"}>
                    <header style={{width: "100%",}}>
                        <AppBar/>
                    </header>

                    <Component {...this.props}/>
                </div>
            );
        }
    };
};


export default withAppBar;