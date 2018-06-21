import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import {withStyles} from '@material-ui/core/styles';
import FileUpload from '../../components/fileUpload/FileUpload'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    fieldContainer: {
        margin: "20px 0"
    }
});

class ImageUploadField extends React.Component {
    render() {
        const {classes: {fieldContainer}, meta: {touched, error}, label, input} = this.props;

        let attr = {};
        let errorMsg = null;

        if (error !== undefined && touched) {
            attr.error = true;
            errorMsg = <Typography color={"error"} variant={"caption"}>{error}</Typography>;
        }

        return (
            <div className={fieldContainer}>
                <FileUpload input={input}/>
                {errorMsg}
            </div>
        );
    };
}

ImageUploadField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageUploadField);