import { Layout } from 'antd';
import Sidebar from './sider';
import PageContent from './content';

const { Footer } = Layout;

function PageLayout({
  children = null,
}) {
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sidebar />
      <Layout className="site-layout">
        <PageContent>{children}</PageContent>
        <Footer style={{ textAlign: 'center', padding: 0 }}>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
