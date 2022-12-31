import { GetStaticProps } from 'next';
import PostDetails from '../../components/PostDetails';
import { client } from '../../sanity';
import { Post } from '../../typings';

interface Props {
  post: Post;
}

const PostPage = ({ post }: Props) => {
  return <PostDetails post={post} />;
};

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
  _id,
  slug {
    current
  }
}`;

  const posts = await client.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    fallback: 'blocking',
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,
  slug,
  description,
  mainImage,
  postImage,
  body,
  author ->{
    name,
    image,
    profileImage,
  },
  'comments': *[_type=="comment" && post._ref == ^._id && approved == true]
}`;

  const post = await client.fetch(query, { slug: params?.slug });

  console.log(post);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: post,
    },
    revalidate: 60,
  };
};

export default PostPage;
