import React from 'react';
import { Tabs } from 'antd';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';

const { TabPane } = Tabs;

export default function ContentBuilder() {
  const callback = () => {
  };

  return (
    <Tabs defaultActiveKey="1" type="card" onChange={callback} tabBarStyle={{ fontSize: 222, 'font-size': '22px' }} size="large">
      <TabPane tab="Structure" key="1">
        <ShowSchema />
      </TabPane>
      <TabPane tab="Contents" key="2">
        <ShowContent />
      </TabPane>
    </Tabs>
  );
}
