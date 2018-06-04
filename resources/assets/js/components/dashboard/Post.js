import React from 'react';
import {connect} from 'react-redux'
import {CardText, CardHeader} from 'material-ui/Card';
import Card from '@material-ui/core/Card';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';
import {deletePost, updatePost} from '../../actions/Post'
import PropTypes from 'prop-types';
import CategoryController from './CategoryController';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    footer: {
        fontSize: 14,
    },
    card: {
        marginTop: 10,
        marginBottom: 10
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

class Post extends React.Component {
    constructor() {
        super();

        this.state = {};
        this.state.content = "";
        this.state.categories = [];
        this.state.isEditable = false;

        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const {content, categories} = this.props;

        this.setState({
            content: content,
            categories: categories.map((cat) => cat.content),
            isEditable: false,
        });
    }

    handleChange(evt) {
        this.setState({content: evt.target.value});
    }

    onEdit() {
        let {content} = this.state;

        this.setState({
            content: content,
            isEditable: true
        });
    }

    onDelete() {
        const {deletePost, id} = this.props;

        deletePost(id);
    }

    onSave() {
        const {id, updatePost} = this.props;
        const {categories} = this.state;

        updatePost(id, {
            content: this.state.content,
            categories: categories,
        });

        this.setState({isEditable: false});
    }

    renderText() {
        const {id, updated_at} = this.props;
        const {content, isEditable, categories} = this.state;

        if (!isEditable) {
            return content;
        }

        return (
            <div>
                <TextField
                    name={`post-${id}`}
                    id={`post-${id}`}
                    style={{width: "100%"}}
                    value={this.state.content}
                    multiLine={true}
                    onChange={this.handleChange}
                />

                <CategoryController chips={categories}
                                    onCreate={(categories) => this.setState({categories: categories})}/>

                <FlatButton label="Save" onClick={this.onSave}/>
                <FlatButton label="Cancel" onClick={() => {
                    this.setState({isEditable: false})
                }}/>
            </div>
        );
    }

    renderImages = () => {
        const {images, classes} = this.props;

        return images.map((image, key) => {
            return <CardMedia
                key={key}
                className={classes.media}
                image={image.path}
                title={image.name}
            />;
        });
    }

    render() {
        const {animationDelay, withAnimation, created_at, classes} = this.props;
        const {categories} = this.state;
        const animationClass = withAnimation ? `animated slideInDown ${animationDelay}` : "";

        const cardClass = [
            "col-xs-12",
            "offset-sm-1",
            "col-sm-10",
            animationClass,
            classes.card,
        ];


        return (
            <Card className={cardClass.join(" ")}>
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    style={{position: "absolute", right: 0, top: 0, zIndex: 10}}
                >
                    <MenuItem primaryText="Edit" onClick={this.onEdit}/>
                    <MenuItem primaryText="Delete" onClick={this.onDelete}/>
                </IconMenu>

                <CardHeader>
                    <Typography className={classes.title} color="textSecondary">
                        {created_at}
                    </Typography>
                </CardHeader>

                <CardText>
                    {this.renderText()}
                </CardText>

                {this.renderImages()}

                <CardText>
                    <Typography className={classes.footer} color="textSecondary">
                        {categories.join(", ")}
                    </Typography>
                </CardText>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

Post.propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    images: PropTypes.array,
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {deletePost, updatePost})(withStyles(styles)(Post));