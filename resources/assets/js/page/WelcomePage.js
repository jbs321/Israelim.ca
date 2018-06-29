import React from 'react';
import {connect} from 'react-redux'
import {getAllBusiness} from '../actions/Business'
import {withStyles} from '@material-ui/core/styles';
import SingleLineCardList from '../components/Grid/SignleLineCardList'
import withAppBar from "../HOC/WithAppBar";
import {compose} from 'recompose';
import withPageWrapper from "../HOC/withPageWrapper";

const styles = (theme) => ({
        container: {
            padding: 0,
        },
        footer: {
            minHeight: 700,
        },
        header: {
            width: "100%",
        },
        floating: {
            height: 100,
            position: "relative",
            marginTop: -50,
        },
        block: {
            height: "100%",
            padding: 5,
        },
        blockWrapper: {
            padding: 5,
        },
        row: {
            height: "100%",
        },
        businessAroundTheWorldSection: {
            paddingBottom: 80,
        },
    }
);

class WelcomePage extends React.Component {
    componentDidMount() {
        this.props.getAllBusiness();
    }

    render() {
        const {classes, business} = this.props;

        return (
            <div>
                <section className={classes.businessAroundTheWorldSection + " mt-3 "}>
                    <SingleLineCardList list={business.list}/>
                </section>

                <section className={classes.businessAroundTheWorldSection + " mt-3 "}>
                    <SingleLineCardList list={business.list}/>
                </section>
            </div>
        );
    }
}

const enhance = compose(
    connect(state => state, {getAllBusiness}),
    withAppBar,
    withPageWrapper,
    withStyles(styles, {withTheme: true})
);

export default enhance(WelcomePage);

