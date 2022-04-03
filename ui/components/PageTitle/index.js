import React from 'react';
import { PageHeader } from 'antd';
import { useRouter } from 'next/router';

function PageTitle({
  title = null, onBack, subTitle = null, extra = [],
}) {
  const router = useRouter();
  return (
    <div>
      <PageHeader
        onBack={onBack || function goBack() { router.back(); }}
        title={title}
        subTitle={subTitle}
        extra={extra}
        style={{ fontSize: '200px' }}
      />
    </div>
  );
}

export default PageTitle;
