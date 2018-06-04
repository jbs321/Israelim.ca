import React from 'react'
import Post from './Post';

/**
 * In order to remove event listener onScroll
 * document.removeEventListener('scroll', this.onScroll);
 *
 * Scroll event for loading more post like facebook
 * document.addEventListener('scroll', this.onScroll);
 */
class PostList extends React.Component {
    render() {
        let list = [];
        const {posts} = this.props;

        if (posts === undefined || posts.length === 0) {
            return null;
        }

        let iteration = Object.keys(posts).length;
        let total = iteration;

        _.each(posts, (post) => {
            //only last 5 posts get animation
            let hasAnimation = (iteration > total - 5);
            let seconds = (total - iteration - 5) * -1;

            list.unshift(
                <Post {...post}
                      key={post.id}
                      images={post.post_images}
                      categories={post.categories}
                      withAnimation={hasAnimation}
                      animationDelay={`delay-${seconds}`}/>
            );

            iteration -= 1;
        });

        return list;
    }
}

export default PostList;