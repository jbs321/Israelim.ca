import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {register} from '../actions/Login';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import PhoneNumberField from "./fields/PhoneField";

export const FORM__REGISTER_USER = "RegisterForm";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    fieldContainer: {
        margin: "20px 0",
    },
});


class Register extends React.Component {
    renderField = (field) => {
        const {classes} = this.props;
        const {meta: {touched, error}, label} = field;
        let attr = {};
        let errorMsg = null;

        if (error !== undefined && touched) {
            attr.error = true;
            errorMsg = <FormHelperText id="name-error-text">{error}</FormHelperText>;
        }
        return (
            <div className={classes.fieldContainer}>
                <FormControl {...attr} aria-describedby="name-error-text" fullWidth>
                    <InputLabel htmlFor="name-error">{label}</InputLabel>
                    <Input id="name-error" {...field.input}/>
                    {errorMsg}
                </FormControl>
            </div>
        );

    };

    renderPhoneNumberField = (field) => {
        const {classes} = this.props;

        return (
            <div className={classes.fieldContainer}>
                <PhoneNumberField {...field}/>
            </div>
        );
    };

    render() {
        const {handleSubmit, onSubmit} = this.props;

        return (
            <div className={"container"}>
                <form onSubmit={handleSubmit(() => {
                })}>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field
                                name="fname"
                                label="First Name"
                                component={this.renderField}
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field
                                name="lname"
                                label="Last Name"
                                component={this.renderField}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <Field
                                name="phone_number"
                                label="Personal Phone Number"
                                component={this.renderPhoneNumberField}
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field
                                name="email"
                                label="Email"
                                component={this.renderField}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field
                                name="password"
                                type="password"
                                label="Password"
                                component={this.renderField}
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field
                                name="password_confirmation"
                                label="Password Confirmation"
                                component={this.renderField}
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.fname) {
        errors.fname = 'Missing First Name';
    }

    if (!values.lname) {
        errors.lname = 'Missing Last Name';
    }

    if (!values.email) {
        errors.email = 'Missing Email';
    }

    if (!values.password) {
        errors.password = 'Missing Password';
    }

    if (!values.password_confirmation) {
        errors.password_confirmation = 'Missing Password Confirmation';
    }

    if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Passwords aren\'t matching';
    }

    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email))) {
        errors.email = 'Please provide a correct email format user@example.com';
    }

    return errors;
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
    // onSubmit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return state;
}

export default reduxForm({
    validate,
    form: FORM__REGISTER_USER
})(
    connect(mapStateToProps, {register})(withStyles(styles)(Register))
);
