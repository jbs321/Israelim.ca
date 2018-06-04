import React from 'react';
import DashboardController from './DashboardController';
import {connect} from "react-redux";
import {findAllByUser, findNextPagination} from "../../actions/Post";
import {withScroll} from './WithScrolling'
import PostList from './PostList'

//Set this HOC outside Class it wont be redefined when re-rendered
const PostListWithScroll = withScroll(PostList);

class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {};
        this.state.isAllLoaded = false;
        this.state.current     = 0;

        this.loadNext = this.loadNext.bind(this);
    }

    componentDidMount() {
        this.props.findAllByUser();
    }


    loadNext(cb) {
        const {posts: {current_page, pages}, findNextPagination} = this.props;

        const first = pages[current_page];

        if(first.current_page === this.state.current) {
            return;
        }

        if (first.current_page === first.last_page) {
            this.setState({
                isAllLoaded: true
            });

            return;
        }

        this.setState({
            current: first.current_page
        });

        findNextPagination(first, (result) => {
            cb();
        });
    }

    render() {
        const {posts} = this.props;
        return (
            <div id={"dashboard-container"}
                 className={"col-xs-12 offset-md-1 col-md-10 offset-lg-3 col-lg-6"}
                 style={{padding: 10}}>
                <DashboardController/>
                <PostListWithScroll posts={posts}
                                    pagination={true}
                                    loadNext={this.loadNext}
                                    isAllLoaded={this.state.isAllLoaded} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {findAllByUser, findNextPagination})(Dashboard);