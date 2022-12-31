import { Post } from '../typings';
import PostContainer from './Post';

interface Props {
  posts: [Post];
}

const Posts = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6">
      {props.posts.map((post) => (
        <PostContainer key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
