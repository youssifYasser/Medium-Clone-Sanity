import SignIn from '../../components/SignIn';

import { getProviders, getSession } from 'next-auth/react';
import { Provider } from '../../typings';
import { client } from '../../sanity';

interface Props {
  providers: [Provider];
}

const signInPage = ({ providers }: Props) => {
  return <SignIn providers={providers} />;
};

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders();
  const session = await getSession(context);
  if (session) {
    const query = `*[_type=="author" && email == $email][0]{
    _id,
    name,
    email,
  }`;

    const author = await client.fetch(query, { email: session?.user.email });

    if (!author) {
      const data = {
        ...session.user,
        tempSlug:
          session.user.name.toLowerCase().replaceAll(' ', '-') +
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
      providers,
    },
  };
};

export default signInPage;
