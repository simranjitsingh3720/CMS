import React from 'react';
import { PageHeader } from 'antd';

function PageTitle({
  title = null, onBack, subTitle = null, extra = [],
}) {
  return (
    <div>
      <PageHeader
        onBack={onBack || function goBack() { window.history.back(); }}
        title={title}
        subTitle={subTitle}
        extra={extra}
        style={{ fontSize: '200px' }}
      />
    </div>
  );
}

export default PageTitle;
