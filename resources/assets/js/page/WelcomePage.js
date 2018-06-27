import React from 'react';
import {connect} from 'react-redux'
import {getAllBusiness} from '../actions/Business'
import {withStyles} from '@material-ui/core/styles';
import AppBar from '../components/AppBar';
import SingleLineCardList from '../components/Grid/SignleLineCardList'

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
            <div className={"container-fluid p-0"}>
                <header className={classes.header}>
                    <AppBar/>
                </header>

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

function mapStateToProps(state) {
    return state;
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {getAllBusiness})(WelcomePage));