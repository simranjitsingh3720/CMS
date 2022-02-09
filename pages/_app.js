import 'antd/dist/antd.css';
<<<<<<< HEAD
import './styles/asset-styles.css'
import './styles/form-styles.css'

import styles from '../styles/globals.scss';
=======
import Head from 'next/head';
import PageLayout from '../ui/page-components/components/layout/PageLayout';
import '../styles/globals.scss';
>>>>>>> b2160438394f86a2b759e9b1d5585e8300548fee

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
