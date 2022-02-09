import React from 'react';
import { PageHeader } from 'antd';
import styles from '../../../../styles/pageTitle.module.scss';

function PageTitle({
  title = null, onBack, subTitle = null, extra = [],
}) {
  return (
    <div>
      <PageHeader
        className={styles.pageTitle}
        onBack={onBack || function goBack() { window.history.back(); }}
        title={title}
        subTitle={subTitle}
        extra={extra}
      />
      {/* <Divider style={{ padding: 0, margin: 0, border: '2px solid red' }} /> */}
    </div>
  );
}

export default PageTitle;
