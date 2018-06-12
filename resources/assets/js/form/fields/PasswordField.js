import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    fieldContainer: {
        margin: "20px 0"
    }
});

class PasswordField extends React.Component {
    render() {
        const {classes: {fieldContainer}, meta: {touched, error}, label, input} = this.props;

        let attr = {};
        let errorMsg = null;

        if (error !== undefined && touched) {
            attr.error = true;
            errorMsg = <FormHelperText id={input.name + "_helperText"}>{error}</FormHelperText>;
        }

        return (
            <div className={fieldContainer}>
                <FormControl {...attr} aria-describedby={input.name + "_helperText"} fullWidth>
                    <InputLabel htmlFor={input.name + "_helperText"}>{label}</InputLabel>
                    <Input type={"password"} {...input}/>
                    {errorMsg}
                </FormControl>
            </div>
        );
    };
}

PasswordField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PasswordField);