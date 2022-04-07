import Head from 'next/head';
import { ConfigProvider } from 'antd';
import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import theme from '../../theme';
import { SessionProvider } from '../../context/SessionContext';
import { request } from '../../helpers/request-helper';

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
    <SessionProvider>
      <Head>
        <title>{title}</title>
      </Head>
      <ConfigProvider>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ConfigProvider>
    </SessionProvider>
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
    // for removing error provide full path
    const res = await request.get('/user/me');
    session = res.data;
  }
  return { session };
};

export default CMSApp;
