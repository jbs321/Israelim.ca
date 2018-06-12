import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllBusiness} from '../actions/Business'
import {withStyles} from '@material-ui/core/styles';
import Search from '../components/Search'
import SingleLineGridList from '../components/Grid/SignleLineGridList'

const styles = (theme) => ({
    container: {
        padding: 0,
    },
    header: {
        background: "blue",
        minHeight: 50,
    },
    footer: {
        minHeight: 700,
    },
    body: {
        minHeight: 700,
        background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://www.aplaceformom.com/blog/wp-content/uploads/2016/09/canadian-cities-with-the-oldest-population.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        padding: 10,
    },
    bodyContainer: {
        height: 30,
        backgroundColor: "#ffffff",
    },
    floating: {
        height: 100,
        position: "relative",
        marginTop: -50,
        backgroundColor: "orange",
    },
    block: {
        backgroundColor: "green",
        height: "100%",
        padding: 5,
    },
    blockWrapper: {
        padding: 5,
    },
    row: {
        height: "100%",
    }
});

class Welcome extends React.Component {
    componentDidMount() {
        this.props.getAllBusiness();
    }

    render() {
        const {classes, business} = this.props;
        console.log(business);
        return (
            <div className={"container-fluid" + " " + classes.container}>
                <header className={classes.header + " align-middle"}>Welcome to the Dungeon</header>

                <div className={classes.body + " d-flex align-items-center"}>
                    <div className={"col-6 offset-3 " + classes.bodyContainer}>
                        <Search/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <div className={classes.floating + " container"}>
                        <div className={classes.row + " row"}>
                            <div className={"col-6 " + classes.blockWrapper}>
                                <div className={classes.block}></div>
                            </div>
                            <div className={"col-6 " + classes.blockWrapper}>
                                <div className={classes.block}></div>
                            </div>
                        </div>

                        <div className="">
                            <SingleLineGridList list={business.list}/>
                        </div>
                    </div>
                </div>

                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default withStyles(styles)(connect(mapStateToProps, {getAllBusiness})(Welcome));