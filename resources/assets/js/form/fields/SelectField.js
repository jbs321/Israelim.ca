import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from '@material-ui/core/styles';
import {mergeClass} from "../../helpers/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import _ from 'lodash'

const styles = () => ({
    fieldContainer: {
        margin: "20px 0"
    }
});

class SelectField extends React.Component {
    render() {
        const {classes: {fieldContainer}, meta: {touched, error}, label, input, placeholder, initEmpty = true, options} = this.props;
        const id = mergeClass(input.name, "_helperText");
        let hasError = false;
        let errorMsg = null;

        if (error !== undefined && touched) {
            hasError = true;
            errorMsg = <FormHelperText id={id}>{error}</FormHelperText>;
        }

        let optionArr = _.map(options, (key, val) => {
            return <MenuItem key={key} value={key}>{val}</MenuItem>;
        });

        let emptyElm = initEmpty ? <MenuItem value=""><em>None</em></MenuItem>: null;

        return (
            <div className={fieldContainer}>
                <FormControl error={hasError} aria-describedby={id} fullWidth>
                    <InputLabel htmlFor={id}>{label}</InputLabel>
                    <Select
                        placeholder={placeholder}
                        {...input}
                    >
                        {emptyElm}
                        {optionArr}
                    </Select>

                    {errorMsg}
                </FormControl>
            </div>
        );
    };
}

SelectField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectField);