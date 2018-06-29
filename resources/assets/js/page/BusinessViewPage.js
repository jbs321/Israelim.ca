import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {getBusiness} from "../actions/BusinessView";
import withAppBar from "../HOC/WithAppBar";
import {compose} from "recompose";
import {getAllBusiness} from "../actions/Business";
import withPageWrapper from "../HOC/withPageWrapper";

const styles = () => ({});

class BusinessViewPage extends React.Component {
    componentDidMount() {
        const {match: {params}} = this.props;

        this.props.getBusiness(params.id);
    }

    render() {
        const {businessView} = this.props;

        return (
            <div>
                {JSON.stringify(businessView)}
            </div>
        );
    }
}

BusinessViewPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    businessView: PropTypes.object.isRequired,
};

const enhance = compose(
    withStyles(styles),
    withAppBar,
    withPageWrapper,
    connect(state => state, {getBusiness}),
);

export default enhance(BusinessViewPage);