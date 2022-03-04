import React, { useEffect, useContext } from 'react';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';
import styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import Tutorial from '../../../components/layout/Tutorial';
import SessionContext from '../../../context/SessionContext';

const { TabPane } = Tabs;

export default function ContentBuilder() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const { session } = useContext(SessionContext);

  const [{ data: schema }, getSchema] = useRequest(
    {
      method: 'GET',
      url: `/schema/${schemaSlug}`,
    },
    { manual: true },
  );
  const callback = (key) => {
    if (key === '2') {
      getSchema();
    }
  };

  useEffect(() => {
    if (schemaSlug) {
      getSchema();
    }
  }, [schemaSlug]);

  const steps = [
    {
      target: '#structure-tut',
      content: 'View your structure here',
      disableBeacon: 'true',
    },
    {
      target: '#contents-tut',
      content: 'View the contents of your table here',
      disableBeacon: 'true',
    },
    {
      target: '.first-step',
      content: 'Add new structure here',
      disableBeacon: 'true',

    },

    {
      target: '#edit-structure',
      content: 'Edit your structure here',
      disableBeacon: 'true',
    },
    {
      target: '#delete-structure',
      content: 'Delete your structure here',
      disableBeacon: 'true',
    },

  ];

  return (
    <>
      {session && session.user.flag && <Tutorial steps={steps} />}

      <div className={styles.content_builder_wrapper}>
        <Tabs defaultActiveKey="1" type="card" onChange={callback} size="large">
          <TabPane tab={<span id="structure-tut">Structure</span>} key="1">
            {schema ? <ShowSchema schema={schema} /> : <>NO SCHEMA FOUND</>}
          </TabPane>
          <TabPane tab={<span id="contents-tut">Contents</span>} key="2">
            <ShowContent schema={schema} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
