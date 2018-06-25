import React from 'react';
import {connect} from 'react-redux';
import {Form, Field, reduxForm} from 'redux-form';
import TextField from "../fields/TextField";
import PhoneField from "../fields/PhoneField";
import {onUpload, onDelete} from '../../actions/Files';
import {registerBusiness} from '../../actions/Registration';
import {validateBusiness as validate} from './RegistrationValidation';
import Typography from '@material-ui/core/Typography';
import FileUpload from '../../components/fileUpload/FileUpload';

export const FORM__REGISTER_BUSINESS_INFO = "RegisterBusinessInformation";

class RegisterBusinessInformation extends React.Component {
    state = {
        uploaded: {},
    };

    handleOnChange = (files) => {
        const {uploaded} = this.state;
        let newFiles = files.filter(file => {
            return !_.has(uploaded, file.name);
        });

        if(_.isEmpty(newFiles)) {
            return;
        }

        onUpload(newFiles).then((data) => {
            let uploaded = data.data;
            uploaded = _.assign(_.keyBy(newFiles, "name"), uploaded);
            this.setState({uploaded: uploaded});
        });
    };

    handleOnDelete = (file) => {
        let {images} = this.state;

        _.remove(images, (image) => (image.name === file.name));

        //handle client remove
        this.setState({images: images});

        //handle server remove
        onDelete(file);
    };

    render() {
        const {valid, handleSubmit, registerBusiness} = this.props;
        const {images} = this.state;

        const onSubmitCallback = () => {
            const {onSubmit} = this.props;

            if (onSubmit !== undefined) {
                onSubmit();
            }
        };

        return (
            <div className={"container"}>
                <Form onSubmit={handleSubmit(registerBusiness.bind(this, onSubmitCallback, images))}>
                    <Field
                        name="name"
                        label="Business Name"
                        component={TextField}/>

                    <div className={"row"}>
                        <div className={"col-sm-6"}>
                            <Field
                                name="phone_number"
                                label="Business Phone Number"
                                component={PhoneField}/>
                        </div>
                        <div className={"col-sm-6"}>
                            <Field
                                name="email"
                                label="Business Email Address"
                                component={TextField}/>
                        </div>
                    </div>

                    <Field
                        name="street_address"
                        label="Street Address"
                        component={TextField}/>

                    <div className={"row"}>
                        <div className={"col-sm-6"}>
                            <Field
                                name="city"
                                label="City"
                                component={TextField}/>
                        </div>
                        <div className={"col-sm-6"}>
                            <Field
                                name="province"
                                label="Province"
                                component={TextField}/>
                        </div>
                    </div>
                    <Field
                        name="industry"
                        label="Industry"
                        component={TextField}/>

                    <div className={"row"}>
                        <div className={"col p-0 m-0"}>
                            <Typography caption={"subheading"}>Upload Business Images</Typography>
                            <FileUpload onChange={this.handleOnChange} onDelete={this.handleOnDelete}/>
                        </div>
                    </div>

                    {
                        JSON.stringify(this.state.uploaded)
                    }

                    <button type="submit" disabled={!valid}>Regsiter</button>
                </Form>
            </div>
        );
    }
}

RegisterBusinessInformation = reduxForm({
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
})(RegisterBusinessInformation);

function mapStateToProps(state) {
    return {
        initialValues: state.register.business
    };
}

export default connect(mapStateToProps, {registerBusiness})(RegisterBusinessInformation);
