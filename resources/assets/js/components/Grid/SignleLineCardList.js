import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from "./Card";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding: 0,
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    cardWrapper: {
        /*maxWidth: 400,*/
    }
});

const renderList = (list) => {
    let listHtml = [];

    _.each(list, (item) => {
        listHtml.push(item);
    });

    return listHtml;
};

function SingleLineCardList(props) {
    const {classes, list} = props;

    return (
        <div className={"container-fluid mx-sm-4 mx-lg-5 mx-2"}>
            <div className={"row"}>
                <Typography gutterBottom variant={"title"} align={"left"}>Businesses around Canada</Typography>
            </div>

            <div className={"row"}>
                {renderList(list).map((tile, key) => {
                    return <div className={"col col-sm-6 col-md-4 col-lg-3 px-0 " + classes.cardWrapper} key={key}>
                        <Card  {...tile}/>
                    </div>;
                })}
            </div>
        </div>
    );
}

SingleLineCardList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineCardList);