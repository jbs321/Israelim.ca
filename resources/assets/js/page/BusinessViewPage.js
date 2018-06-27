import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {getBusiness} from "../actions/BusinessView";

const styles = (theme) => ({});

class BusinessViewPage extends React.Component {
    componentDidMount() {
        const {match: {params}} = this.props;
        this.props.getBusiness(params.id);
    }

    render() {
        const {businessView} = this.props;

        return <div>
            {JSON.stringify(businessView)}
        </div>;

    }
}

BusinessViewPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    businessView: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return state;
}

//add styles
BusinessViewPage = withStyles(styles)(BusinessViewPage);
//connect to redux
BusinessViewPage = connect(mapStateToProps, {getBusiness})(BusinessViewPage);

export default BusinessViewPage;
