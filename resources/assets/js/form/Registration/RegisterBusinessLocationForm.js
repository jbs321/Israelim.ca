import React from 'react'
import PropTypes from "prop-types";
import {Field, Form, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "recompose";
import TextField from "../fields/TextField";
import {validate} from './Validation/BusinessLocationFormValidation'
import PostalCodeField from "../fields/PostalCodeField";
import SelectField from "../fields/SelectField";
import {registerBusinessLocation} from '../../actions/BusinessRegistration/RegisterBusinessLocation'

export const FORM__REGISTER_BUSINESS_LOCATION = "form__register_business_location";

class RegisterBusinessLocationForm extends React.Component {
    render() {
        const {handleSubmit} = this.props;
        const that = this;

        return (
            <div className={"container"}>
                <Form onSubmit={handleSubmit((values) => {
                    values.business_id = that.props.business_id;
                    registerBusinessLocation(values, (data) => {
                        that.props.onSubmit(data);
                    });
                })}>
                    <Field
                        name="street_address"
                        label="Street Address"
                        placeholder={"e.g. 11108 107th Avenue"}
                        component={TextField}/>

                    <Field
                        name="apt"
                        label="Apt, Suite. (Optional)"
                        placeholder={"e.g. Suite #7"}
                        component={TextField}/>


                    <div className="row">
                        <div className="col-md-6">
                            <Field
                                name="city"
                                label="Town/City"
                                placeholder={"e.g. Edmonton"}
                                component={TextField}/>
                        </div>
                        <div className="col-md-6">
                            <Field
                                name="province"
                                label="Province"
                                options={
                                    {
                                        BC: 'BC',
                                        AB: 'AB',
                                        SK: 'SK',
                                        MB: 'MB',
                                        ON: 'ON',
                                        QC: 'QC',
                                        NB: 'NB',
                                        NS: 'NS',
                                        PE: 'PE',
                                        NL: 'NL',
                                        YT: 'YT',
                                        NT: 'NT',
                                        NU: 'NU',
                                    }
                                }
                                component={SelectField}/>
                        </div>
                    </div>

                    <Field
                        name="postal_code"
                        label="Postal Code"
                        placeholder={"e.g. T5H 3Z3"}
                        component={PostalCodeField}
                    />

                </Form>
            </div>
        );
    }
}

RegisterBusinessLocationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

const config = {
    form: FORM__REGISTER_BUSINESS_LOCATION,
    fields: [
        'business_id',
        'postal_code',
        'province',
        'city',
        'apt',
        'street_address',
    ],
    validate,
    destroyOnUnmount: false,
};

export default compose(
    reduxForm(config),
    connect(state => ({initialValues: state.registerBusiness.location, business_id: state.registerBusiness.business_id}), {registerBusinessLocation}),
)(RegisterBusinessLocationForm);