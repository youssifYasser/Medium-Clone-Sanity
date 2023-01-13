import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
