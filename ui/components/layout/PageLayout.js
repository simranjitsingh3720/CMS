import { Layout } from 'antd';
import { useRouter } from 'next/router';
import Sidebar from './Pagesider';
import PageContent from './PageContent';
import styles from './style.module.scss';

const { Footer } = Layout;

function PageLayout({
  children = null,
}) {
  const router = useRouter();

  const blockRoute = ['/', '/admin/signin', '/admin/signup'];

  const { pathname } = router;

  return (
    <Layout className={styles.layout} hasSider>

      {!blockRoute.includes(pathname) ? <Sidebar /> : null}
      <Layout className="site-layout">
        <PageContent>{children}</PageContent>
        <Footer style={{ textAlign: 'center', padding: 0 }}>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
