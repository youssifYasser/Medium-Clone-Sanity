import Link from 'next/link';
import { Post } from '../typings';
import { urlFor } from '../sanity';
import Image from 'next/image';

interface Props {
  post: Post;
}

const PostContainer = ({ post }: Props) => {
  return (
    <Link href={`/post/${post.slug.current}`} key={post._id}>
      <div className="border rounded-lg group cursor-pointer overflow-hidden">
        <div className="relative h-60 w-full group-hover:scale-105 transition-transform duration-200 ease-in-out">
          <Image
            fill
            src={post.mainImage ? urlFor(post.mainImage).url() : post.postImage}
            alt="post thumbnail"
            className="object-cover "
          />
        </div>

        <div className="flex justify-between items-center bg-white p-2 gap-2">
          <div>
            <p className="text-lg font-bold">{post.title}</p>
            <p className="text-sm">
              {post.description.slice(0, 30)}
              {post.description.slice(30).length > 0 && '...'} by{' '}
              <span className="font-bold">{post.author.name}</span>
            </p>
          </div>
          <div className="relative h-11 w-11">
            <Image
              fill
              src={
                post.author.image
                  ? urlFor(post.author.image).url()
                  : post.author.profileImage
              }
              alt="author profile picture"
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostContainer;
