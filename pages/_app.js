import 'antd/dist/antd.css';
import '../ui/globals.scss';
import Head from 'next/head';
import PageLayout from '../ui/page-components/components/layout/PageLayout';

function MyApp({ Component, pageProps }) {
  const { title: propTitle } = pageProps || {};
  const content = <Component {...pageProps} />;

  let title = 'COGO-CMS';

  if (propTitle) {
    title = `${title} | ${propTitle}`;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PageLayout>
        {content}
      </PageLayout>
    </>
  );
}

export default MyApp;
