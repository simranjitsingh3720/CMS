import 'antd/dist/antd.css';

import PageLayout from '../ui/page-components/components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
