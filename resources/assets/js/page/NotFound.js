import React from 'react'
import {compose} from 'recompose'
import Typography from '@material-ui/core/Typography'
import withPageWrapper from "./withPageWrapper";

class NotFound extends React.Component{
    render () {
        return (
            <Typography variant={"display2"}>Not Found</Typography>
        );
    }
}

const enhance = compose(
    withPageWrapper
)(NotFound);

export default enhance;