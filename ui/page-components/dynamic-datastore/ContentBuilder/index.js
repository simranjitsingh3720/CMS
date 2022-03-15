import React, { useEffect, useState } from 'react';
import { message, Tabs } from 'antd';
import { useRouter } from 'next/router';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';
import styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import ContentTutorial from './ContentTutorial';
import Error from '../../../components/Error/Error';

const { TabPane } = Tabs;

export default function ContentBuilder() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const [notFound, setNotFound] = useState(false);

  const [{ data: schema }, getSchema] = useRequest(
    {
      method: 'GET',
      url: `/schema/${schemaSlug}`,
    },
    { manual: true },
  );
  const callback = (key) => {
    if (key === '1') {
      getSchema().then(() => {}).catch((err) => {
        if (err.response.data.code === 'MissingError') {
          setNotFound(true);
        } else {
          message.error(err.response.data.message || err.response.data.messages[0]);
        }
      });
    }
  };

  useEffect(() => {
    if (schemaSlug) {
      getSchema().then(() => {}).catch((err) => {
        if (err.response.data.code === 'MissingError') {
          setNotFound(true);
        } else {
          message.error(err.response.data.message || err.response.data.messages[0]);
        }
      });
    }
  }, [schemaSlug]);

  return (
    <div>
      {notFound ? <Error message="Page Not Found" code={404} /> : (
        <>
          <ContentTutorial />
          <div className={styles.content_builder_wrapper}>
            <Tabs defaultActiveKey="1" onChange={callback} size="large">
              <TabPane tab="Contents" key="1">
                <ShowContent schema={schema} />
              </TabPane>
              <TabPane tab="Structure" key="2">
                {schema ? <ShowSchema schema={schema} /> : <>NO SCHEMA FOUND</>}
              </TabPane>
              <TabPane tab="Settings" key="3">
                <span style={{ fontSize: '55px', textAlign: 'center' }}>Settings</span>
              </TabPane>
            </Tabs>
          </div>
        </>
      ) }

    </div>
  );
}
