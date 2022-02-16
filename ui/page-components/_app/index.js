import Head from 'next/head';
import axios from 'axios';
import RouteGuard from './RouteGuard';
import PageLayout from '../../components/layout/PageLayout';

function CMSApp({ Component, pageProps, session }) {
  const { title: propTitle } = pageProps || {};
  let title = 'COGO-CMS';
  if (propTitle) {
    title = `${title} | ${propTitle}`;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <RouteGuard session={session}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </RouteGuard>
    </>)
  }

CMSApp.getInitialProps = async ({ ctx }) => {
  const isServer = !!ctx?.req;
  let session = {};
  if (isServer) {
    session = {
      user: ctx?.req?.session?.user,
      sessionId: ctx?.req?.sessionID,
    };
  } else {
    const res = await axios.get('http://localhost:8000/api/user/me');
    session = res.data;
  }
  return { session };
};

export default CMSApp;
