import React from 'react'
import PropTypes from "prop-types";
import {Field, Form, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "recompose";
import TextField from "../fields/TextField";
import {validate, asyncValidate} from './Validation/RegisterBusinessLocationFormValidation'
import {registerBusinessLocation} from '../../actions/BusinessRegistration/RegisterBusinessLocation'
import PostalCodeField from "../fields/PostalCodeField";
import SelectField from "../fields/SelectField";

export const FORM__REGISTER_BUSINESS_LOCATION = "form__register_business_location";

class RegisterBusinessLocationForm extends React.Component {
    render() {
        const {handleSubmit, registerBusinessLocation} = this.props;
        const that = this;

        return (
            <div className={"container"}>
                <div className={"col col-sm-6"}>
                    <Form onSubmit={handleSubmit((values) => {
                        let related_id = that.props.related_id;

                        if (!related_id)
                            throw new Error("Missing Business ID");

                        values.related_id = related_id;

                        registerBusinessLocation(values, (data) => {
                            that.props.onSubmit(data);
                        });
                    })}>
                        <Field
                            name="address"
                            label="Street Address"
                            placeholder={"e.g. 11108 107th Avenue"}
                            component={TextField}/>

                        <Field
                            name="apartment"
                            label="Apt, Suite. (Optional)"
                            placeholder={"e.g. Suite #7"}
                            component={TextField}/>


                        <Field
                            name="city"
                            label="Town/City"
                            placeholder={"e.g. Edmonton"}
                            component={TextField}/>

                        <Field
                            name="province"
                            label="Province"
                            component={SelectField}
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
                            }/>

                        <Field
                            name="postal_code"
                            label="Postal Code"
                            placeholder={"e.g. T5H 3Z3"}
                            component={PostalCodeField}
                        />

                    </Form>
                </div>
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
        'postal_code',
        'province',
        'city',
        'apartment',
        'address',
    ],
    validate,
    asyncValidate,
    destroyOnUnmount: false,
    enableReinitialize: true,
};

function mapStateToProps(state) {
    return {
        initialValues: state.registerBusiness.location,
        related_id: state.registerBusiness.id,
    }
}

export default compose(
    connect(mapStateToProps, {registerBusinessLocation}),
    reduxForm(config),
)(RegisterBusinessLocationForm);