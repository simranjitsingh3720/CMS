import React from 'react';
import { Content } from 'antd/lib/layout/layout';
import { useRouter } from 'next/router';
import PageTitle from '../PageTitle';
import styles from './style.module.scss';

const blockRoute = ['/', '/admin/signin', '/admin/signup'];

function PageContent({ children = null }) {
  const { title } = children?.props || {};
  const { notDisplay } = children.props;
  const router = useRouter();
  const { pathname } = router;
  return (
    <Content className={styles.content}>
      <div
        className={styles.site}
      >
        {!notDisplay && !blockRoute.includes(pathname) ? <PageTitle title={title} /> : null}

        {children}
      </div>
    </Content>
  );
}

export default PageContent;
