import React from 'react'
import PropTypes from "prop-types";
import {Form, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "recompose";
import {registerBusinessLocationConfirmation} from '../../actions/BusinessRegistration/RegisterBusinessLocationConfirmation'
import MapContainer from '../../components/Google/MapContainer'

export const FORM__REGISTER_BUSINESS_LOCATION_CONFIRMATION = "form__register_business_location_confirmation";

class RegisterBusinessLocationConfirmationForm extends React.Component {
    render() {
        const {handleSubmit, registerBusinessLocationConfirmation, registerBusiness: {location}} = this.props;
        const that = this;

        return (
            <div className={"container"}>
                <Form onSubmit={handleSubmit((values) => {
                    const locationRegistered = (data) => {
                        this.props.onSubmit(data);
                    };

                    const locationNotFound = (data) => {
                        alert("Address Not Found");
                    };

                    values.location_id = that.props.registerBusiness.location.id;

                    registerBusinessLocationConfirmation(values, locationRegistered, locationNotFound);
                })}>
                </Form>

                <MapContainer style={{width: '100%', minHeight: 600}} location={location}/>
            </div>
        );
    }
}

RegisterBusinessLocationConfirmationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

const config = {
    form: FORM__REGISTER_BUSINESS_LOCATION_CONFIRMATION,
    fields: [],
    destroyOnUnmount: false,
};

export default compose(
    reduxForm(config),
    connect(state => state, {registerBusinessLocationConfirmation}),
)(RegisterBusinessLocationConfirmationForm);