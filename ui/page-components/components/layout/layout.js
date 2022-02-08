import { Layout } from 'antd';
import Link from 'next/link';
import Sidebar from './sider';
import Content from './content';

const { Header, Footer } = Layout;

function PageLayout({ children = null }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="site-layout-background" style={{ color: 'white' }}>
        <Link href="/">COGO-CMS</Link>
      </Header>
      <Layout className="site-layout">
        <Sidebar />
        <Content style={{ textAlign: 'center' }}>{children}</Content>
      </Layout>
      <Footer style={{ textAlign: 'center', padding: 0 }}>Footer</Footer>
    </Layout>
  );
}

export default PageLayout;
