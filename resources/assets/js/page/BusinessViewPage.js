import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {getBusiness} from "../actions/BusinessView";
import withAppBar from "../components/AppBar/WithAppBar";
import {compose} from "recompose";
import withPageWrapper from "./withPageWrapper";
import {withSpacer} from "../components/Spacer";
import Typography from "@material-ui/core/Typography";

const styles = () => ({});

class BusinessViewPage extends React.Component {
    componentDidMount() {
        const {getBusiness, match} = this.props;
        getBusiness(match.params.id);
    }


    /**
     * Display the Business
     * 1.
     *
     */
    render() {
        const {businessView} = this.props;

        //replace this with react component
        if(Object.keys(businessView).length === 0) {
            return null;
        }

        const {location, name} = businessView;
        const {address} = location;

        return (
            <div className={"container"}>
                <Typography component={"p"}>{name}</Typography>
                <Typography>{address}</Typography>
                <Typography>
                    What Do i want to see here?
                    1. I want to see Business Name, phone, email, and Type,
                    2. I want to see where its located
                    3. I want to see what the business has to offer
                    4. I want to see the Owner name
                    5. i want to see some images.

                </Typography>
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
    connect(state => state, {getBusiness}),
    withStyles(styles),
    withAppBar,
    withSpacer,
    withPageWrapper,
)(BusinessViewPage);

export default enhance;