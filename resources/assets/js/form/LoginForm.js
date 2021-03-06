import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {login} from '../actions/Login';
import {fetchAuth} from '../actions/Auth';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import history from '../history';

const style = {
    margin: 12,
};

class LoginForm extends React.Component {
    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ""}`;

        return (
            <div className={className}>
                <TextField
                    {...field.input}
                    className="field login-field"
                    />

                <div className="text-help">{touched ? error : ""}</div>
            </div>
        );
    }

    render() {
        const {handleSubmit} = this.props;
        const className = (this.props.className !== undefined) ? this.props.className : "";
        return (
            <div className={"login-container " + className} style={this.props.style}>
                <div className={"login-form " + className} style={this.props.style}>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            name="email"
                            label="Email"
                            component={this.renderField}
                        />

                        <Field
                            name="password"
                            label="Password"
                            component={this.renderField}
                        />

                        <Button type={"submit"}/>
                    </form>
                </div>

                <Link to={"/"}>home</Link>
            </div>
        );
    }

    onSubmit(data) {
        this.props.login(data.email, data.password, () => {
            this.props.fetchAuth();
            history.push('/');
        });
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Missing Email';
    }

    if (!values.password) {
        errors.password = 'Missing Password';
    }

    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email))) {
        errors.email = 'Please provide a correct email format user@example.com';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(state => state, {login, fetchAuth})(LoginForm)
);
