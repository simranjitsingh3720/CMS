import React from 'react';
import { Tabs } from 'antd';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';
import styles from './style.module.scss';

const { TabPane } = Tabs;

export default function ContentBuilder() {
  const callback = () => {
  };

  return (
    <div className={styles.content_builder_wrapper}>
      <Tabs defaultActiveKey="1" type="card" onChange={callback} size="large">
        <TabPane tab="Structure" key="1">
          <ShowSchema />
        </TabPane>
        <TabPane tab="Contents" key="2">
          <ShowContent />
        </TabPane>
      </Tabs>
    </div>

  );
}
