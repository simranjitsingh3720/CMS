import {
  Layout, Menu, Button, Avatar, Popover,
} from 'antd';
import {
  LogoutOutlined, UserOutlined,
} from '@ant-design/icons';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import navData from './sideNavContent';
import style from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import SessionContext from '../../../context/SessionContext';

const { Header, Footer } = Layout;

function PageSider() {
  const { session } = useContext(SessionContext);
  const Router = useRouter();
  const { Sider } = Layout;
  const [visible, setVisible] = useState(false);
  // const [collapsed, setCollapsed] = useState(false);

  // const onCollapse = (isCollapsed) => {
  //   setCollapsed(isCollapsed);
  // };
  const [{}, handleGet] = useRequest({ method: 'GET' }, { manual: true });

  const signout = () => {
    handleGet({ url: '/auth/signout' })
      .then(() => {
        Router.push('/admin/signin');
      });
  };
  const handleClick = () => {
    setVisible(false);
    Router.push('/admin/profile');
  };

  const content = (
    (session)
      ? (
        <div>
          <h3>
            {session.user.firstName}
            {' '}
            {session.user.lastName}
          </h3>
          <p>{session.user.email}</p>
          <Button type="button" onClick={handleClick}>
            <UserOutlined style={{ marginRight: 4 }} />
            Profile
          </Button>
          <br />
          <Button onClick={signout}>
            <LogoutOutlined style={{ marginRight: 4 }} />
            Sign out
          </Button>
        </div>
      ) : null
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
          className={style.foot}
        >
          <Popover
            placement="right"
            content={content}
            trigger="click"
            overlayInnerStyle={{ backgroundColor: '#EEE' }}
            overlayClassName={style.popover}
            visible={visible}
            // onVisibleChange={handleVisibleChange}
          >
            <div
              className={style.font}
              onClick={() => setVisible(true)}
            >
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
