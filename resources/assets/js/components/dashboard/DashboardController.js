import React from 'react'
import {connect} from 'react-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {createUserPost} from '../../actions/Post';
import CategoryController from "./CategoryController";
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LabelIcon from '@material-ui/icons/Label';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FileUpload from "../fileUpload/FileUpload";

const styles = theme => ({
    paperClass: {
        padding: 10,
        margin: 15,
    },
    editBtn: {
        float: "right"
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

class DashboardController extends React.Component {

    state = {
        chips: [],
        post_text: "",
        uploadImages: false,
        uploaded: [],
        displayCategory: false,
    };

    renderPlaceholder = () => {
        const {user: {name}} = this.props;
        let ph = "What's on your mind";

        if (name !== undefined) {
            ph += `, ${_.upperFirst(name)}`;
        }

        return ph;
    }




    submitPost = () => {
        const {post_text, chips, uploaded} = this.state;

        if (post_text === undefined || post_text === "") {
            return null;
        }

        let that = this;

        this.props.createUserPost({
            content: post_text,
            categories: chips,
            photos: uploaded,
        }, (data) => {
            that.setState({
                chips: [],
                post_text: "",
                uploadImages: false,
                displayCategory: false,
            });
        });
    }

    handleInputChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    }

    toggleCategories = () => {
        const {displayCategory} = this.state;

        //clear selection
        if(displayCategory) {
            this.setState({chips: []});
        }

        //hide/display
        this.setState({
            displayCategory: !displayCategory
        });
    }

    toggleUpload = () => {
        const {uploadImages} = this.state;

        //clear selection
        if(uploadImages) {
            this.setState({uploaded: []});
        }

        //hide/show
        this.setState({uploadImages: !uploadImages});
    };

    renderCategoryController = () => {
        const {displayCategory} = this.state;

        if (!displayCategory) {
            return null;
        }

        return (
            <CategoryController onCreate={(chips) => {
                this.setState({
                    chips: chips
                });
            }}/>
        );
    };

    renderImageUploadController = () => {
        let that = this;
        const {uploadImages, uploaded} = this.state;

        if (!uploadImages) {
            return null;
        }

        return (
            <FileUpload
                images={uploaded}
                onChange={(uploaded) => {
                    that.setState({uploaded: uploaded});
                }}/>
        );
    };

    render() {
        const {classes} = this.props;
        const {post_text} = this.state;

        return (
            <div>
                <Card>
                    <CardText>
                        <TextField
                            name={"post_text"}
                            id={"post_text"}
                            style={{width: "100%"}}
                            value={post_text}
                            rowsMax={4}
                            hintText={this.renderPlaceholder()}
                            onChange={this.handleInputChange}
                            multiLine={true}/>
                    </CardText>


                    {this.renderCategoryController()}

                    {this.renderImageUploadController()}

                    <CardActions>
                        <FlatButton label="Post" onClick={this.submitPost}/>

                        <IconButton color="primary" aria-label="Add Category" onClick={this.toggleCategories}>
                            <LabelIcon/>
                        </IconButton>

                        <IconButton color="primary" className={classes.button} component="span"
                                    onClick={this.toggleUpload}>
                            <PhotoCamera/>
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state;
}

DashboardController.propTypes = {
    classes: PropTypes.object,
};

export default connect(mapStateToProps, {createUserPost})(withStyles(styles)(DashboardController));