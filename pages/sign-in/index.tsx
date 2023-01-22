import SignIn from '../../components/SignIn';

import { getProviders } from 'next-auth/react';
import { Provider } from '../../typings';
import Head from 'next/head';

interface Props {
  providers: [Provider];
}

const signInPage = ({ providers }: Props) => {
  return (
    <>
      <Head>
        <title>Login - Medium</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SignIn providers={providers} />;
    </>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default signInPage;
