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
            mask={[/[a-zA-Z]/,/[0-9]/,/[a-zA-Z]/,' ',/[0-9]/,/[a-zA-Z]/,/[0-9]/]}
            placeholderChar="_"
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

class PostalCodeField extends React.Component {
    render() {
        const {classes: {fieldContainer}, label, input, meta: {error, touched}} = this.props;
        let attr = {};
        let errorMsg = null;

        if (error !== undefined && touched) {
            attr.error = true;
            errorMsg = <FormHelperText id={input.name + "_helperText"}>{error}</FormHelperText>;
        }

        const id = input.name + "_helperText";

        return (
            <div className={fieldContainer}>
                <FormControl {...attr} aria-describedby={id} fullWidth>
                    <InputLabel htmlFor={id} shrink={true}>{label}</InputLabel>
                    <Input id={id} inputComponent={TextMaskCustom} {...input}/>
                    {errorMsg}
                </FormControl>
            </div>
        );
    }
}

PostalCodeField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostalCodeField);