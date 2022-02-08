import React from 'react';
import { Content } from 'antd/lib/layout/layout';

function PageContent({ children }) {
  return (
    <Content style={{ margin: '0 16px' }}>

      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        {children}
      </div>
    </Content>
  );
}

export default PageContent;
