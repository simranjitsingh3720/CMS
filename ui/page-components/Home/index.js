import { Button, Form, Input, message, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import SessionContext from '../../context/SessionContext';
import { useRequest } from '../../helpers/request-helper';
import styles from './styles.module.scss';

function Home() {
  const { session } = useContext(SessionContext);

  return (
    <div>
      <div className={styles.title}>
        Hello! Mr.
        {' '}
        {session ? (
          <span>
            {session.user.firstName}
            {' '}
            {session.user.lastName}
          </span>
        ) : <span>Please Login or Signup to continue</span>}
      </div>

    </div>
  );
}

export default Home;
