import { Layout, Menu } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import navData from './sideNavContent';

function PageSider() {
  const Router = useRouter();
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu theme="dark" mode="inline" selectedKeys={Router.pathname}>

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
