import { Layout, Menu } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import navData from './sideNavContent';

const { Header } = Layout;

function PageSider() {
  const Router = useRouter();
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        overflow: 'auto',
        height: '100vh',
      }}
    >
      <Menu theme="dark" mode="inline" selectedKeys={Router.pathname}>
        <Header className="site-layout-background" style={{ color: 'white', paddingLeft: '20px' }}>
          <strong>
            <Link href="/"> CMS</Link>
          </strong>
        </Header>

        {navData.map((data) => (
          <Menu.Item key={data.path} icon={data.icon}>
            <Link href={data.path}>{data.name}</Link>
          </Menu.Item>
        ))}

      </Menu>
    </Sider>
  );
}

export default PageSider;
