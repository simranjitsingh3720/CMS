import { Layout } from 'antd';
import Link from 'next/link';
import Sidebar from './sider';
import Content from './content';

const { Header, Footer } = Layout;

function PageLayout({ children = null }) {
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>

      <Sidebar />

      <Layout className="site-layout">
        <Content style={{ textAlign: 'center' }}>{children}</Content>
        <Footer style={{ textAlign: 'center', padding: 0 }}>Footer</Footer>

      </Layout>
    </Layout>
  );
}

export default PageLayout;
