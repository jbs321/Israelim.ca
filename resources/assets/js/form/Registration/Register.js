import React from 'react';
import {connect} from 'react-redux';
import {Form, Field, reduxForm} from 'redux-form';
import {registerUser} from "../../actions/Registration";
import {asyncValidate, validate} from './RegistrationValidation';
import TextField from '../fields/TextField';
import PhoneNumberField from "../fields/PhoneField";
import PasswordField from "../fields/PasswordField";
export const FORM__REGISTER_USER = "RegisterForm";

class Register extends React.Component {
    render() {
        return (
            <div className={"container"}>
                <Form onSubmit={this.props.handleSubmit(this.props.registerUser.bind(this))}>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field
                                name="first_name"
                                label="First Name"
                                component={TextField}
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field
                                name="last_name"
                                label="Last Name"
                                component={TextField}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <Field
                                name="phone_number"
                                label="Personal Phone Number"
                                component={PhoneNumberField}
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field
                                name="email"
                                label="Personal Email Address"
                                component={TextField}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field
                                name="password"
                                type="password"
                                label="Password"
                                component={PasswordField}
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field
                                name="password_confirmation"
                                label="Password Confirmation"
                                component={PasswordField}
                            />
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

const asyncBlurFields = [
    'email',
];

const config = {
    form: FORM__REGISTER_USER,
    fields: [
        'id',
        'email',
        'first_name',
        'last_name',
        'phone_number',
        'password',
        'password_confirmation'],
    validate,
    asyncValidate,
    destroyOnUnmount: false,
    asyncBlurFields: asyncBlurFields,
};

Register = reduxForm(config)(Register);

export default connect(state => ({
    initialValues: state.register.user
}), {registerUser})(Register);
