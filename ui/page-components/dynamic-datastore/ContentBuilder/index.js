import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';
import styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';

const { TabPane } = Tabs;

export default function ContentBuilder() {
  const callback = () => {
  };
  const router = useRouter();
  const { schemaSlug } = router.query;

  const [{ data: schema, loading, error }, getSchema] = useRequest(
    {
      method: 'GET',
      url: `/schema/${schemaSlug}`,
    },
    { manual: true },
  );

  useEffect(() => {
    if (schemaSlug) {
      getSchema();
    }
  }, [schemaSlug]);

  console.log('error ', schema);

  return (
    <div className={styles.content_builder_wrapper}>
      <Tabs defaultActiveKey="1" type="card" onChange={callback} size="large">
        <TabPane tab="Structure" key="1">
          {schema ? <ShowSchema schema={schema} /> : <>NO SCHEMA FOUND</>}
        </TabPane>
        <TabPane tab="Contents" key="2">
          <ShowContent schema={schema} />
        </TabPane>
      </Tabs>
    </div>

  );
}
