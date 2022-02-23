import Head from 'next/head';
import axios from 'axios';
import { ConfigProvider } from 'antd';
import RouteGuard from './RouteGuard';
import PageLayout from '../../components/layout/PageLayout';
import theme from '../../theme';

if (typeof window !== 'undefined') {
  ConfigProvider.config({
    prefixCls: 'ant',
    iconPrefixCls: 'anticon',
    theme,
  });
}

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
      <ConfigProvider>
        <RouteGuard session={session}>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </RouteGuard>
      </ConfigProvider>
    </>
  );
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
