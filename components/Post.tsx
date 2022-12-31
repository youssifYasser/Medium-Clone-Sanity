import Link from 'next/link';
import { Post } from '../typings';
import { urlFor } from '../sanity';

interface Props {
  post: Post;
}

const PostContainer = ({ post }: Props) => {
  return (
    <Link href={`/post/${post.slug.current}`} key={post._id}>
      <div className="border rounded-lg group cursor-pointer overflow-hidden">
        <img
          src={
            post.mainImage
              ? urlFor(post.mainImage).url()
              : post.postImage
              ? post.postImage
              : 'https://dummyimage.com/600x400/000/fff'
          }
          alt="post thumbnail"
          className="h-60 object-cover w-full group-hover:scale-105 transition-transform duration-200 ease-in-out"
        />

        <div className="flex justify-between items-center bg-white p-2 gap-2">
          <div>
            <p className="text-lg font-bold">{post.title}</p>
            <p className="text-sm">
              {post.description.slice(0, 30)}
              {post.description.slice(30).length > 0 && '...'} by{' '}
              <span className="font-bold">{post.author.name}</span>
            </p>
          </div>
          <img
            src={
              post.author.image
                ? urlFor(post.author.image).url()
                : post.author.profileImage
                ? post.author.profileImage
                : 'https://dummyimage.com/600x400/000/fff'
            }
            alt="author profile picture"
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default PostContainer;
