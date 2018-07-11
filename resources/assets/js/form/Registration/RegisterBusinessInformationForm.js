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
import TitlebarGridList from '../../components/TitlebarGridList'

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

    renderImageTile = () => {
        const {initialValues: {images, user}} = this.props;

        let data = !images ? null : images.map((image, key) => {
            image.path   = `/file/${image.id}`;
            image.title  = key;
            image.author = `${user.first_name} ${user.last_name}`;

            return image;
        });

        return !data ? null : (
            <div className={"col p-0 m-0"}>
                <TitlebarGridList data={data} options={[
                    {
                        name: "Delete",
                        action: (image) => deleteFile(image),
                    },
                    {
                        name: "Make main Photo",
                        action: (image) => console.log("make main photo", image),
                    },
                ]}/>
            </div>
        );
    };

    render() {
        const {handleSubmit, registerBusiness, business} = this.props;
        const that = this;

        console.log(business);

        return (
            <div className={"container"}>
                <Form onSubmit={handleSubmit((values) => {
                    let filtered = _.pickBy(that.state.images, (image, name) => {
                        return that.state.selected.includes(name);
                    });

                    let paths = _.map(filtered, image => image.path);

                    if (that.props.initialValues && that.props.initialValues.id) {
                        values.id = that.props.initialValues.id;
                    }

                    registerBusiness(data => this.props.onSubmit(data), paths, values);
                })}>
                    <div className={"row"}>
                        <div className={"col-sm-6"}>
                            <Field
                                name="name"
                                label="Business Name"
                                component={TextField}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-sm-6"}>
                            <Field
                                name="phone_number"
                                label="Business Phone Number"
                                component={PhoneField}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-sm-6"}>
                            <Field
                                name="email"
                                label="Business Email Address"
                                component={TextField}/>
                        </div>
                    </div>

                    <Field
                        name="industry"
                        label="Industry"
                        component={TextField}/>

                    <div className={"col p-0 m-0"}>
                        <Typography caption={"subheading"}>Upload Business Images</Typography>
                        <FileUpload onChange={this.handleOnChange} onDelete={this.handleOnDelete}
                                    images={that.props.initialValues.images}/>
                    </div>

                    {this.props.business.images ? JSON.stringify(this.props.business.images.map((image) => image.name)) : null}

                    {this.renderImageTile()}
                </Form>
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