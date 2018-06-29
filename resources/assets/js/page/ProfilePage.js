import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import {fetchUserDetails} from '../actions/User';
import {
    deepOrange300,
    purple500,
} from 'material-ui/styles/colors';
import withPageWrapper from "../HOC/withPageWrapper";

const style = {margin: 5};

class ProfilePage extends React.Component {
    componentDidMount() {
        this.props.fetchUserDetails();
    }

    render() {
        const {name, email} = this.props.user;


        if (name === undefined
            && email === undefined) {
            return null;
        }

        return (
            <div>
                <Card>
                    <CardHeader
                        title={name.toUpperCase()}
                        subtitle={email}
                        avatar={
                            <Avatar
                                color={deepOrange300}
                                backgroundColor={purple500}
                                size={30}
                                style={style}>
                                {name.charAt(0).toUpperCase()}
                            </Avatar>}
                    />
                    <CardTitle title="Card title" subtitle="Card subtitle"/>
                    <CardText>

                    </CardText>
                    <CardActions>
                        <FlatButton label="Save"/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const enhance = compose(
    withPageWrapper,
    connect(state => state, {fetchUserDetails})
)(ProfilePage);

export default enhance;