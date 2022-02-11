import React from 'react';
import { Content } from 'antd/lib/layout/layout';
import { useRouter } from 'next/router';
import PageTitle from '../PageTitle';

const blockRoute = ['/', '/admin/signin', '/admin/signup'];

function PageContent({ children = null }) {
  const { title } = children.props;
  const router = useRouter();
  const { pathname } = router;
  return (
    <Content style={{
      overflow: 'auto',
      height: '100vh',
    }}
    >

      <div
        className="site-layout-background"
        style={{ padding: 12, minHeight: 360 }}
      >

        {!blockRoute.includes(pathname) ? <PageTitle title={title} /> : null}

        {children}
      </div>
    </Content>
  );
}

export default PageContent;
