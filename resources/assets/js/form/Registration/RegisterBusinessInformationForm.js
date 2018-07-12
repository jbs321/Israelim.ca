import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose'
import {Field, Form, reduxForm} from 'redux-form';
import PropTypes from "prop-types";
import TextField from "../fields/TextField";
import PhoneField from "../fields/PhoneField";
import {onDelete, onUpload, deleteFile} from '../../actions/Files';
import {registerBusiness, reLoadRegistration} from '../../actions/BusinessRegistration/RegisterBusinessInfo';
import {validate} from './Validation/RegisterBusinessInformationFormValidation';
import Typography from '@material-ui/core/Typography';
import FileUpload from '../../components/fileUpload/FileUpload';
import _ from "lodash";
import UploadBusinessImages from './UploadBusinessImages'

export const FORM__REGISTER_BUSINESS_INFO = "RegisterBusinessInformation";

class RegisterBusinessInformationForm extends React.Component {
    state = {
        images: {},
        selected: [],
    };

    handleOnChange = (files) => {
        const {images} = this.state;

        let newState = {};

        let selected = files.map(file => {
            return file.name;
        });

        this.setState({selected: selected});

        let filtered = _.filter(files, (file) => !Object.keys(images).includes(file.name));

        if (!filtered.length) return;

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
        const that = this;

        const filePath = _.find(images, (item, name) => name === file.name).path;

        onDelete(filePath).then(data => {
            let deletedPath = data.data;
            let filtered = _.pickBy(images, (img) => img.path !== deletedPath);
            that.setState({images: filtered});
        });
    };

    onSubmit = (values) => {
        const {registerBusiness} = this.props;
        const that = this;

        let filtered = _.pickBy(that.state.images, (image, name) => {
            return that.state.selected.includes(name);
        });

        let paths = _.map(filtered, image => image.path);

        if (that.props.initialValues && that.props.initialValues.id) {
            values.id = that.props.initialValues.id;
        }

        registerBusiness(data => this.props.onSubmit(data), paths, values);
    };

    render() {
        const {handleSubmit, initialValues: {images}} = this.props;

        return (
            <div className={"container"}>
                <Form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <Field
                                name="name"
                                label="Business Name"
                                component={TextField}/>
                            <Field
                                name="phone_number"
                                label="Business Phone Number"
                                component={PhoneField}/>
                            <Field
                                name="email"
                                label="Business Email Address"
                                component={TextField}/>
                            <Field
                                name="industry"
                                label="Industry"
                                component={TextField}/>

                            <div className={"col p-0 m-0 mt-4"}>
                                <Typography caption={"subheading"}>Upload Business Images</Typography>
                                <FileUpload onChange={this.handleOnChange} onDelete={this.handleOnDelete} images={images}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className={"col"}>
                            {this.renderUploadedImages()}
                        </div>
                    </div>
                </Form>
            </div>
        );
    }

    renderUploadedImages = () => {
        const {business: {images}} = this.props;

        if(!images || images.length === 0) {
            return null;
        }

        return (
            <div className={"col p-0 m-0 mt-4"}>
                <Typography className={"mb-2"} caption={"subheading"}>Uploaded Images</Typography>
                <UploadBusinessImages/>
            </div>
        );
    }
}

RegisterBusinessInformationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

const config = {
    form: FORM__REGISTER_BUSINESS_INFO,
    fields: [
        'industry',
        'phone_number',
        'name'
    ],
    validate,
    destroyOnUnmount: false,
    enableReinitialize: true,
};

const enhance = compose(
    connect(state => ({
        initialValues: state.registerBusiness,
        business: state.registerBusiness
    }), {registerBusiness, reLoadRegistration}),
    reduxForm(config),
)(RegisterBusinessInformationForm);

export default enhance;