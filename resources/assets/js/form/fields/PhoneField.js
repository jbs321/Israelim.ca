import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask'
import PropTypes from "prop-types"
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    fieldContainer: {
        margin: "20px 0"
    }
});

function TextMaskCustom(field) {
    const {inputRef, ...other} = field;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

class PhoneNumberField extends React.Component {
    render() {
        const {classes: {fieldContainer}, label, input, meta: {error, touched}} = this.props;
        let attr = {};
        let errorMsg = null;

        if (error !== undefined && touched) {
            attr.error = true;
            errorMsg = <FormHelperText id={input.name + "_helperText"}>{error}</FormHelperText>;
        }

        return (
            <div className={fieldContainer}>
                <FormControl {...attr} aria-describedby={input.name + "_helperText"} fullWidth>
                    <InputLabel
                        htmlFor={input.name + "_helperText"}
                        shrink={true}>{label}</InputLabel>
                    <Input
                        id={input.name + "_helperText"}
                        inputComponent={TextMaskCustom}
                        {...input}
                    />
                    {errorMsg}
                </FormControl>
            </div>
        );
    }
}

PhoneNumberField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneNumberField);