import React from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {mergeClass} from "../helpers/styles";

const styles = {
    page: {
        height: "100%",
    }
};

const withPageWrapper = (Component) => {
    const pageComponent = class WrappedComponent extends React.Component {
        render() {
            const {classes} = this.props;

            return (
                <div className={mergeClass(classes.page, "page")}>
                    <Component {...this.props}/>
                </div>
            );
        }
    };

    pageComponent.propTypes = {classes: PropTypes.object.isRequired};

    return withStyles(styles)(pageComponent);
};

export default withPageWrapper;