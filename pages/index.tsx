import { getSession } from 'next-auth/react';
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

export const getServerSideProps = async (context: any) => {
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

  const session = await getSession(context);

  if (session) {
    const query = `*[_type=="author" && email == $email]{
    _id,
    name,
    email,
  }`;

    const author = (
      await client.fetch(query, { email: session?.user.email })
    )[0];

    if (!author) {
      const data = {
        ...session.user,
        tempSlug:
          session.user.email
            .toLowerCase()
            .replaceAll('@', '-')
            .replaceAll('.', '-')
            .replaceAll('_', '-') +
          '-' +
          Math.random().toString().slice(2),
      };

      await client.create({
        _type: 'author',
        name: data.name,
        email: data.email,
        slug: {
          _type: 'slug',
          current: data.tempSlug,
        },
        profileImage: data.image,
      });
    }
  }

  return {
    props: {
      posts: posts,
    },
  };
};

export default Home;
