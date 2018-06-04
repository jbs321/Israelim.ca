import React from 'react';
import { Link } from 'react-router-dom'

export default class Welcome extends React.Component {
    render() {
        return (
            <div className={"container-fluid"}>
                <h1>Welcome</h1>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        );
    }
}