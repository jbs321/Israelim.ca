import React from 'react';
import Placeholder from "../Placeholder";

export function withScroll(ComponentList) {
    class ListWithScroll extends React.Component {
        constructor() {
            super();

            this.state = {};
            this.state.isAllLoaded = false;
            this.state.isLoading = false;

            this.onScroll = this.onScroll.bind(this);
            this.onLoad = this.onLoad.bind(this);
            this.togglePlaceholder = this.togglePlaceholder.bind(this);
        }

        componentDidMount() {
            window.addEventListener('scroll', this.onScroll, false);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll, false);
        }

        shouldComponentUpdate() {
            //If isAllLoaded == true : don't try and load more data.
            return !this.state.isAllLoaded;
        }

        onLoad() {
            const {isAllLoaded, loadNext} = this.props;

            if (isAllLoaded !== undefined && isAllLoaded) {
                this.setState({isLoading: false});
                return null;
            }

            this.setState({isLoading: true});

            let that = this;
            loadNext(() => {
                that.setState({isLoading: false});
            });
        }

        onScroll() {
            let offsetHeight = document.querySelector('#with-scroll-wrapper').offsetHeight;

            if (window.innerHeight + window.scrollY >= offsetHeight) {
                this.onLoad();
            }
        }

        togglePlaceholder() {
            return this.state.isLoading ? <Placeholder/> : null;
        }

        render() {
            let arrayList = [];

            const {posts: {list}, pagination} = this.props;

            if (pagination !== undefined
                && list !== undefined
                && pagination) {

                arrayList = list;
            }


            return (
                <div className={"with-scroll-wrapper"} id={"with-scroll-wrapper"}>
                    <ComponentList posts={arrayList}/>
                    {this.togglePlaceholder()}
                </div>
            );
        }
    }

    return ListWithScroll;
}
