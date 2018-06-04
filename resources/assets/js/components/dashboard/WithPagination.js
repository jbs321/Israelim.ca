import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {findNextPagination} from '../../actions/Post';

export function WithPagination(ComponenetList) {
    class PostListPagination extends React.Component {
        constructor() {
            super();

            this.state = {};
            this.state.isAllLoaded = false;
            this.state.isLoading = false;
            this.state.current = false;

            this.next        = this.next.bind(this);
            this.loadMoreBtn = this.loadMoreBtn.bind(this);
            this.spinner     = this.spinner.bind(this);
            // this.onScroll = this.onScroll.bind(this);
        }

        shouldComponentUpdate() {
            const {isAllLoaded} = this.state;
            return !isAllLoaded;
        }


        next() {
            const {posts, findNextPagination} = this.props;
            const first = _.first(posts);

            if (first.current_page === first.last_page) {
                this.setState({
                    isAllLoaded: true
                });

                return;
            }

            this.setState({
                isLoading: true,
                current: first.current_page
            });

            findNextPagination(first, (result) => {
                this.setState({isLoading: false});
            });


        }

        loadMoreBtn() {
            if (!this.state.isAllLoaded) {
                return (
                    <div className="interactions">
                        <button onClick={this.next}>Load More</button>
                    </div>
                );
            }

            return null;
        }

        spinner() {
            if (this.state.isLoading) {
                return (
                    <div className="spinner">
                        Loading...
                    </div>
                );
            }

            return null;
        }

        handleScroll() {
            console.log("handle scroll in WithPagination hahahahha");
        }

        render() {
            let recordList = [];
            const {posts} = this.props;

            if (!posts || posts.length === 0) {
                return null;
            }

            posts.forEach((pagination) => {
                _.each(pagination.data, (record) => {
                    recordList.unshift(record);
                });
            });

            return (
                <div>
                    <ComponenetList list={recordList}/>
                    {this.loadMoreBtn()}
                    {this.spinner()}
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return state;
    }

    return connect(mapStateToProps, {findNextPagination})(PostListPagination);
}



// onScroll() {
//     const {posts} = this.props;
//     const {current} = this.state;
//
//     if (current !== _.first(posts).current_page) {
//         if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && posts.length) {
//             this.next();
//         }
//     }
// }