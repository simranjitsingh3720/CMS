import 'antd/dist/antd.css';
import '../ui/globals.scss';
import Script from 'next/script';
import Head from 'next/head';
import PageLayout from '../ui/components/layout/PageLayout';

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

      <Script
        id="html2canvas"
        src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"
      />
    </>
  );
}

export default MyApp;
