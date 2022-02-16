import React, { useState } from 'react';
import { Tabs } from 'antd';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';

const { TabPane } = Tabs;

export default function ContentBuilder() {
  const callback = () => {
  };

  return (
    <Tabs defaultActiveKey="1" type="card" onChange={callback} size="large">
      <TabPane tab="Structure" key="1">
        <ShowSchema />
      </TabPane>
      <TabPane tab="Contents" key="2">
        <ShowContent />
      </TabPane>
    </Tabs>
  );
}
