import React from 'react';
import { PageHeader } from 'antd';
import styles from './styles.module.scss';

function PageTitle({
  title = null, subTitle = null, extra = [],
}) {
  return (
    <div>
      <PageHeader
        // onBack={onBack || function goBack() { window.history.back(); }}
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
