import 'antd/dist/antd.css';
import PageLayout from '../ui/page-components/components/layout/layout';
import styles from '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
