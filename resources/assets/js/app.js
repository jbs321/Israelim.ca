import React from 'react';
import {ProtectedRoutes} from './Routes';
import AuthBoundary from './components/AuthBoundary';
import ErrorBoundary from "./components/ErrorBoundary";

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <ErrorBoundary>
                    <AuthBoundary>
                        <ProtectedRoutes/>
                    </AuthBoundary>
                </ErrorBoundary>
            </div>
        );
    }
}
