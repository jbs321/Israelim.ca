import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose'
import {Form, Field, reduxForm} from 'redux-form';
import TextField from "../fields/TextField";
import PhoneField from "../fields/PhoneField";
import {onUpload, onDelete} from '../../actions/Files';
import {registerBusiness} from '../../actions/Registration';
import {validateBusiness as validate} from './RegistrationValidation';
import Typography from '@material-ui/core/Typography';
import FileUpload from '../../components/fileUpload/FileUpload';
import _ from "lodash";
import PropTypes from "prop-types";

export const FORM__REGISTER_BUSINESS_INFO = "RegisterBusinessInformation";

class RegisterBusinessInformationForm extends React.Component {
    state = {
        images: {},
        selected: [],
    };

    handleOnChange = (files) => {
        const {images} = this.state;
        let newState = {};

        this.setState({selected: files.map(file => file.name)});

        let filtered = _.filter(files, (file) => {
            return !Object.keys(images).includes(file.name);
        });

        if (filtered.length === 0) {
            return;
        }

        onUpload(filtered).then((data) => {
            let uploaded = data.data;

            _.each(uploaded, (path, name) => {
                newState = _.assign(images, {
                    [name]: {
                        path,
                        uploaded: true,
                    }
                })
            });

            this.setState({images: newState});
        });
    };

    handleOnDelete = (file) => {
        let {images} = this.state;
        const filePath = _.find(images, (item, name) => name === file.name).path;
        let that = this;

        onDelete(filePath).then(data => {
            let deletedPath = data.data;
            let filtered = _.pickBy(images, (img) => img.path !== deletedPath);
            that.setState({images: filtered});
        });
    };

    render() {
        const {handleSubmit, registerBusiness} = this.props;
        const {images, selected} = this.state;

        const onSubmitCallback = (data) => {
            const {onSubmit} = this.props;

            if (onSubmit !== undefined) {
                onSubmit(data);
            }
        };

        return (
            <div className={"container"}>
                <Form onSubmit={handleSubmit((values) => {
                    let filtered = _.pickBy(images, (image, name) => {
                        return selected.includes(name);
                    });

                    let paths = _.map(filtered, image => image.path);

                    registerBusiness(onSubmitCallback, paths, values);
                })}>
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

                    <div className={"col p-0 m-0"}>
                        <Typography caption={"subheading"}>Upload Business Images</Typography>
                        <FileUpload onChange={this.handleOnChange} onDelete={this.handleOnDelete}/>
                    </div>

                    {/*<button type="submit" disabled={!valid}>Regsiter</button>*/}
                </Form>
            </div>
        );
    }
}

RegisterBusinessInformationForm.propTypes = {
    onRemoteSubmit: PropTypes.func,
};

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

const enhance = compose(
    reduxForm(config),
    connect(state => ({initialValues: state.register.business}), {registerBusiness}),
)(RegisterBusinessInformationForm);

export default enhance;