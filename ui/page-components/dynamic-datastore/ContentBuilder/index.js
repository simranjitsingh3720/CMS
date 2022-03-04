import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';
import styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';

const { TabPane } = Tabs;

export default function ContentBuilder() {
  const router = useRouter();
  const { schemaSlug } = router.query;

  const [{ data: schema }, getSchema] = useRequest(
    {
      method: 'GET',
      url: `/schema/${schemaSlug}`,
    },
    { manual: true },
  );
  const callback = (key) => {
    if (key === '1') {
      getSchema();
    }
  };

  useEffect(() => {
    if (schemaSlug) {
      getSchema();
    }
  }, [schemaSlug]);

  return (
    <div className={styles.content_builder_wrapper}>
      {/* <Tabs defaultActiveKey="1" type="card" onChange={callback} size="large">
        <TabPane tab="Structure" key="1">
          {schema ? <ShowSchema schema={schema} /> : <>NO SCHEMA FOUND</>}
        </TabPane>
        <TabPane tab="Contents" key="2">
          <ShowContent schema={schema} />
        </TabPane>
      </Tabs> */}

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

  );
}
