import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from '@material-ui/core/styles';
import {mergeClass} from "../../helpers/styles";

const styles = () => ({
    fieldContainer: {
        margin: "20px 0"
    }
});

class TextField extends React.Component {
    render() {
        const {classes: {fieldContainer}, meta: {touched, error}, label, input, placeholder} = this.props;
        const id = mergeClass(input.name, "_helperText");
        let hasError = false;
        let errorMsg = null;

        if (error !== undefined && touched) {
            hasError = true;
            errorMsg = <FormHelperText id={id}>{error}</FormHelperText>;
        }

        return (
            <div className={fieldContainer}>
                <FormControl error={hasError} aria-describedby={id} fullWidth>
                    <InputLabel htmlFor={id}>{label}</InputLabel>
                    <Input placeholder={placeholder} {...input}/>
                    {errorMsg}
                </FormControl>
            </div>
        );
    };
}

TextField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextField);