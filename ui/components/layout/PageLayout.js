import { Layout } from 'antd';
import { useRouter } from 'next/router';
import Sidebar from './Pagesider';
import PageContent from './PageContent';

const { Footer } = Layout;

const blockRoute = ['/', '/admin/signin', '/admin/signup'];

function PageLayout({
  children = null,
}) {
  const router = useRouter();

  const { pathname } = router;

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      {!blockRoute.includes(pathname) ? <Sidebar /> : null}
      <Layout className="site-layout">
        <PageContent>{children}</PageContent>
        <Footer style={{ textAlign: 'center', padding: 0 }}>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
