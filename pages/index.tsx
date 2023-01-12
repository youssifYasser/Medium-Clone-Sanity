import Head from 'next/head';
import Banner from '../components/Banner';
import Posts from '../components/Posts';
import { client } from '../sanity';
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

const Home = (props: Props) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Banner />
      <Posts posts={props.posts} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
  _id,
  title,
  author->{
    name,
    image,
    profileImage,
    },
  description,
  mainImage,
  postImage,
  slug  
}`;

  const posts = await client.fetch(query);

  return {
    props: {
      posts: posts,
    },
  };
};

export default Home;
