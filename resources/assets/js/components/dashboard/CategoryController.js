import React from 'react';
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles';
import TextField from 'material-ui/TextField';
import {Card, CardText} from 'material-ui/Card'
import PostCategoryChipArray from "./PostCategoryChipArray";

const styles = {
    paperClass: {
        padding: 10,
        margin: 15,
    },
};

class CategoryController extends React.Component {
    constructor() {
        super();

        this.state = {};
        this.state.chips = [];
        this.state.post_category = "";
        this.onEnter = this.onEnter.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.renderList = this.renderList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        const {chips} = this.props;

        if(chips === undefined) {
            return;
        }

        this.setState({
            chips: chips
        });
    }

    onDelete(elem, chip) {
        let {chips} = this.state;
        chips = _.pull(chips, chip);

        this.setState({
            chips: chips
        });

        if(this.props.onCreate) {
            this.props.onCreate(chips);
        }
    }

    handleInputChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    onEnter(e) {
        let val = e.target.value;

        if (e.key !== 'Enter') {
            return;
        }

        let {chips} = this.state;

        if(val.includes(",")) {
            chips = chips.concat(val.split(","));
        } else {
            chips.push(val);
        }



        this.setState({
            chips: chips,
            post_category: "",
        });

        if(this.props.onCreate) {
            this.props.onCreate(chips);
        }
    }

    renderList() {
        const {chips} = this.state;

        if (chips === undefined || chips.length === 0) return null;

        return <PostCategoryChipArray chips={chips} onDelete={this.onDelete}/>;
    }

    render() {
        const {paperClass} = this.props.classes;
        const {post_category} = this.state;
        return (
            <Card className={paperClass}>
                <CardText>
                    <TextField
                        placeholder={"Categories: e.g. Food, Hobby, Thought, Reminder"}
                        name={"post_category"}
                        fullWidth
                        id={"post_category"}
                        label="Search field"
                        onKeyPress={this.onEnter}
                        value={post_category}
                        onChange={this.handleInputChange}
                        type="search"
                        margin="normal"/>
                </CardText>

                <CardText>
                    {this.renderList()}
                </CardText>
            </Card>
        );

    }
}

CategoryController.propTypes = {
    classes: PropTypes.object,
    onCreate: PropTypes.func,
    chips: PropTypes.array,
};

export default withStyles(styles)(CategoryController);