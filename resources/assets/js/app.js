import React from 'react';
import State from './tools/state';
import Routes from './Routes';
import AuthBoundary from './components/AuthBoundary';
import ErrorBoundary from "./components/ErrorBoundary";

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <ErrorBoundary>
                    <AuthBoundary>
                        <Routes/>
                    </AuthBoundary>
                </ErrorBoundary>
            </div>
        );
    }
}
