import React from 'react';
import { PageHeader } from 'antd';
import styles from './styles.module.scss';

function PageTitle({
  title = null, subTitle = null, extra = [],
}) {
  return (
    <PageHeader
      // onBack={onBack || function goBack() { window.history.back(); }}
      title={title}
      subTitle={subTitle}
      extra={extra}
      className={styles.page_title}
    />
  );
}

export default PageTitle;
