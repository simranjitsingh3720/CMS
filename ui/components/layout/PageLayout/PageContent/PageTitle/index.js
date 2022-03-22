import React from 'react';
import { PageHeader } from 'antd';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

function PageTitle({
  title = null, onBack, subTitle = null, extra = [],
}) {
  const router = useRouter();
  const { pathname } = router;
  const blockRoute = ['/admin/page-manager', '/admin/datastore', '/admin/assets', '/admin/users', '/form/[formId]'];

  return (
    <div>
      <PageHeader
        onBack={!blockRoute.includes(pathname)
          ? onBack || function goBack() { window.history.back(); } : null}
        title={title}
        subTitle={subTitle}
        extra={extra}
        notDisplay={false}
        className={styles.page_title}
      />
    </div>
  );
}

export default PageTitle;
