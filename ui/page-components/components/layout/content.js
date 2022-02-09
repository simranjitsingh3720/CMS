import React from 'react';
import { Content } from 'antd/lib/layout/layout';
import PageTitle from '../pageTitle/PageTitle';

function PageContent({ children = null }) {
  const { title } = children.props;
  return (
    <Content style={{
      overflow: 'auto',
      height: '100vh',
    }}
    >

      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <PageTitle title={title} />
        {children}
      </div>
    </Content>
  );
}

export default PageContent;
