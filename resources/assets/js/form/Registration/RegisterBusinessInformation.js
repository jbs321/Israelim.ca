import React from 'react';
import {connect} from 'react-redux';
import {Form, Field, reduxForm} from 'redux-form';
import TextField from "../fields/TextField";
import PhoneField from "../fields/PhoneField";
import {registerBusiness} from '../../actions/Registration';
import {validateBusiness as validate} from './RegistrationValidation';
import history from '../../history';
import Typography from '@material-ui/core/Typography';
import ImageUploadField from "../fields/ImageUploadField";

export const FORM__REGISTER_BUSINESS_INFO = "RegisterBusinessInformation";

class RegisterBusinessInformation extends React.Component {
    render() {
        return (
            <div className={"container"}>
                <Form
                    onSubmit={this.props.handleSubmit(this.props.registerBusiness.bind(this, () => history.push("/")))}>
                    <Field
                        name="name"
                        label="Business Name"
                        component={TextField}
                    />

                    <div className={"row"}>
                        <div className={"col-sm-6"}>
                            <Field
                                name="phone_number"
                                label="Business Phone Number"
                                component={PhoneField}
                            />
                        </div>
                        <div className={"col-sm-6"}>
                            <Field
                                name="email"
                                label="Business Email Address"
                                component={TextField}
                            />
                        </div>
                    </div>

                    <Field
                        name="street_address"
                        label="Street Address"
                        component={TextField}
                    />

                    <div className={"row"}>
                        <div className={"col-sm-6"}>
                            <Field
                                name="city"
                                label="City"
                                component={TextField}
                            />
                        </div>
                        <div className={"col-sm-6"}>
                            <Field
                                name="province"
                                label="Province"
                                component={TextField}
                            />
                        </div>
                    </div>
                    <Field
                        name="industry"
                        label="Industry"
                        component={TextField}
                    />

                    <div className={"row"}>
                        <div className={"col p-0 m-0"}>
                            <Typography caption={"subheading"}>Upload Business Images</Typography>
                            <Field
                                name={"images"}
                                label={"images"}
                                component={ImageUploadField}
                            />
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}


const config = {
    form: FORM__REGISTER_BUSINESS_INFO,
    fields: [
        'city',
        'province',
        'industry',
        'phone_number',
        'street_address',
        'name'
    ],
    validate,
    destroyOnUnmount: false,
};

RegisterBusinessInformation = reduxForm(config)(RegisterBusinessInformation);

export default connect(state => ({
    initialValues: state.register.business
}), {registerBusiness})(RegisterBusinessInformation);
