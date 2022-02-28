import {
  Layout, Menu, Button, Avatar, Popover,
} from 'antd';
import {
  PoweroffOutlined, UserOutlined,
} from '@ant-design/icons';
import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import navData from './sideNavContent';
import Styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import SessionContext from '../../../context/SessionContext';

const { Header, Footer } = Layout;

function PageSider() {
  const { session } = useContext(SessionContext);
  const Router = useRouter();
  const { Sider } = Layout;
  // const [collapsed, setCollapsed] = useState(false);

  // const onCollapse = (isCollapsed) => {
  //   setCollapsed(isCollapsed);
  // };
  const [{}, handleGet] = useRequest({ method: 'GET' }, { manual: true });

  const signout = () => {
    handleGet({ url: '/auth/signout' })
      .then(() => Router.push('/admin/signin'));
  };
  const content = (
    <div>
      <Link href="/admin/profile">
        <Button>
          <UserOutlined style={{ marginRight: '5px' }} />
          Profile
        </Button>
      </Link>
      <br />
      <Button onClick={signout}>
        <PoweroffOutlined style={{ marginRight: '5px' }} />
        Sign out
      </Button>
    </div>
  );
  const profileImage = () => {
    if (session) {
      if (session.user.ProfilePicture) return <img src={session.user.ProfilePicture.url} alt="profile" />;
      return <UserOutlined />;
    }
    return <UserOutlined />;
  };
  return (
    <Sider
      // collapsible
      // collapsed={collapsed}
      // onCollapse={onCollapse}
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

        <Footer
          className={Styles.foot}
        >
          <Popover
            placement="top"
            content={content}
            trigger="click"
            overlayInnerStyle={{ backgroundColor: '#EEE' }}
            overlayClassName={Styles.popover}
            overlayStyle={{
              width: '105px',
            }}
          >
            <div className={Styles.font}>
              <Avatar icon={profileImage()} style={{ marginRight: '10px' }} />
              {session ? session.user.firstName : null}
            </div>
          </Popover>
        </Footer>
      </Menu>
    </Sider>
  );
}

export default PageSider;
