import React from 'react'
import MaskedInput from 'react-text-mask'
import PropTypes from "prop-types"
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

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
        const {label, input, meta: {error, touched}} = this.props;
        let attr = {};
        let errorMsg = null;

        if (error !== undefined && touched) {
            attr.error = true;
            errorMsg = <FormHelperText id="name-error-text">{error}</FormHelperText>;
        }

        return (
            <FormControl {...attr} aria-describedby="name-error-text" fullWidth>
                <InputLabel
                    htmlFor="name-error"
                    shrink={true}>{label}</InputLabel>
                <Input
                    id="name-error"
                    value="+1 (   )    -    "
                    inputComponent={TextMaskCustom}
                    {...input}
                />
                {errorMsg}
            </FormControl>
        );
    }
}

export default PhoneNumberField;