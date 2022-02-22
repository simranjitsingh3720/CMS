import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';

const { TabPane } = Tabs;

export default function ContentBuilder() {
  const callback = () => {
  };
  const router = useRouter();
  const { schemaSlug } = router.query;

  const [{ data: schema, loading, error }, getSchema] = useAxios(
    {
      method: 'GET',
      url: `http://localhost:8000/api/schema/${schemaSlug}`,
    },
    { manual: true },
  );

  useEffect(() => {
    if (schemaSlug) {
      getSchema();
    }
  }, [schemaSlug]);

  return (
    <Tabs defaultActiveKey="1" type="card" onChange={callback} size="large">
      <TabPane tab="Structure" key="1">
        {schema ? <ShowSchema schema={schema} /> : <>NO SCHEMA FOUND</>}
      </TabPane>
      <TabPane tab="Contents" key="2">
        <ShowContent schema={schema} />
      </TabPane>
    </Tabs>
  );
}
