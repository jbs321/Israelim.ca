import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PhoneNumberField from './fields/PhoneField'

export const FORM__REGISTER_BUSINESS_INFO = "RegisterBusinessInformation";

const styles = theme => ({
    fieldContainer: {
        margin: "20px 0",
    },
});


class RegisterBusinessInformation extends React.Component {
    renderField = (field) => {
        const {classes} = this.props;
        const {meta: {touched, error}, label} = field;
        let formHeleperText = null;
        let attr = {};

        if (touched && error !== undefined) {
            attr.error = true;
            formHeleperText = <FormHelperText id="name-error-text">{error}</FormHelperText>;
        }

        return (
            <div className={classes.fieldContainer}>
                <FormControl {...attr} aria-describedby="name-error-text" fullWidth>
                    <InputLabel htmlFor="name-error">{label}</InputLabel>
                    <Input id="name-error" {...field.input}/>
                    {formHeleperText}
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
        const {handleSubmit, onSubmit, classes} = this.props;

        return (
            <form onSubmit={handleSubmit(() => {
            })}>
                <Field
                    name="name"
                    label="Business Name"
                    component={this.renderField}
                />

                <Field
                    name="phone_number"
                    label="Business Phone Number"
                    component={this.renderPhoneNumberField}
                />

                <Field
                    name="street_address"
                    label="Street Address"
                    component={this.renderField}
                />

                <div className={"row"}>
                    <div className={"col-sm-6"}>
                        <Field
                            name="city"
                            label="City"
                            component={this.renderField}
                        />
                    </div>
                    <div className={"col-sm-6"}>
                        <Field
                            name="province"
                            label="Province"
                            component={this.renderField}
                        />
                    </div>
                </div>
                <Field
                    name="industry"
                    label="Industry"
                    component={this.renderField}
                />
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Missing Business Name';
    }

    if (!values.phone_number) {
        errors.phone_number = 'Missing Business Phone Number';
    }

    if (values.phone_number === "+1 (   )    -    ") {
        errors.phone_number = 'Missing Business Phone Number';
    }


    return errors;
}

RegisterBusinessInformation.propTypes = {
    classes: PropTypes.object.isRequired,
    // onSubmit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return state;
}

export default reduxForm({
    validate,
    form: FORM__REGISTER_BUSINESS_INFO
})(
    connect(mapStateToProps, null)(withStyles(styles)(RegisterBusinessInformation))
);
