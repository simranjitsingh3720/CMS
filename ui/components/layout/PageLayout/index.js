import { Layout } from 'antd';
import { useRouter } from 'next/router';
import PageSider from './PageSider';
import PageContent from './PageContent';
import styles from './style.module.scss';

function PageLayout({
  children = null,
}) {
  const router = useRouter();

  const blockRoute = ['/', '/admin/signin', '/admin/signup'];

  const { pathname } = router;

  return (
    <Layout className={styles.layout} hasSider>

      {!blockRoute.includes(pathname) ? <PageSider /> : null}
      <Layout className="site-layout">
        <PageContent>{children}</PageContent>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
