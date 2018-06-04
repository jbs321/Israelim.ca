import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        console.log(info.componentStack);
        // Display fallback UI
        this.setState({
            hasError: true,
            errorText: info.componentStack
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div>
                <h1>Something went wrong.</h1>
                <div>
                    {this.state.errorText}
                </div>

            </div>
        }

        return this.props.children;
    }
}