import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import LongMenu from "./LongMenu";
import withWidth from '@material-ui/core/withWidth';
import {compose} from 'recompose'

const styles = theme => ({
    root: {
        margin: "auto",
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "100%",
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    listTitle: {
        margin: "auto",
        textAlign: "center",
    },
});

const renderImages = (props) => {
    const {images, options} = props;

    return images.map((image, key) => (
        <GridListTile key={key}>
            <img src={image.src} alt={image.title}/>
            <GridListTileBar title={image.title}
                             subtitle={<span>{image.subtitle}</span>}
                             icon={<InfoIcon/>}
                             actionIcon={<LongMenu image={image} options={options}/>}/>
        </GridListTile>
    ))
};

function TitlebarGridList(props) {
    const {classes, cellHeight, width} = props;
    const {gridList, root} = classes;
    let cols = 3;

    switch (width) {
        case 'xs':
            cols = 2;
            break;
        case 'lg':
            cols = 4;
            break;
        default:
            cols = 3;
    }

    return (
        <div className={root}>
            <GridList cellHeight={cellHeight || 180} cols={cols} className={gridList}>
                {renderImages(props)}
            </GridList>
        </div>
    );
}

TitlebarGridList.propTypes = {
    cols: PropTypes.number,
    title: PropTypes.string,
    images: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    cellHeight: PropTypes.number,
};

const enhance = compose(
    withStyles(styles),
    withWidth()
)(TitlebarGridList);

export default enhance;