import Head from 'next/head';
import RouteGuard from './RouteGuard';
import PageLayout from '../../components/layout/PageLayout';

function CMSApp({ Component, pageProps, session }) {
  console.log("Page props ", pageProps);
  console.log("====");
  const { title: propTitle  } = pageProps || {};
  let title = 'COGO-CMS';

  console.log({ session });
  console.log("propTitle ", propTitle);
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
    </>
  );
}

CMSApp.getInitialProps = ({ ctx }) => {
  console.log("ctx ", ctx);
  const { session } = ctx?.req || {};
  return { session };
};

export default CMSApp;



