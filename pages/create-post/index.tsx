import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CreatePost from '../../components/CreatePost';
import { client } from '../../sanity';
import { Author } from '../../typings';

interface Props {
  author: Author;
}
const createPostPage = ({ author }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Create A Post</title>
      </Head>
      <CreatePost author={author} />;
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  let author = '';
  if (session) {
    const query = `*[_type=="author" && email == $email][0]{
      _id,
      name,
      email,
      image {
        asset{
          _ref
        },
      },
      profileImage,
    }`;

    author = await client.fetch(query, { email: session?.user.email });
  }
  return {
    props: {
      author,
    },
  };
};

export default createPostPage;
