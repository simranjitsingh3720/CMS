import React from 'react';
import { Tabs } from 'antd';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default function ContentBuilder() {
  return (
    <Tabs defaultActiveKey="1" type="card" onChange={callback} size="large">
      <TabPane style={{ marginRight: 200 }} tab="Structure" key="1">
        <ShowSchema />
      </TabPane>
      <TabPane tab="Contents" key="2">
        <ShowContent />
      </TabPane>
    </Tabs>
  );
}
