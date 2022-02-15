import { Drawer, Tabs } from 'antd';
import React, { useState } from 'react';
import AppearanceType from './AppearanceType';
import FieldDetails from './FieldDetails';

const { TabPane } = Tabs;

export default function StructureDrawer({ closeSchemaDrawer, setIsSchemaDrawer, size }) {
  const [dataType, setDataType] = useState('text');
  console.log('ss ', dataType);
  const handleOnDataTypeChange = (value) => {
    setDataType(value);
  };

  return (
    <Drawer title="Create a new field" placement="right" onClose={closeSchemaDrawer} size="large" visible>
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="Field Details" key="1">
          <FieldDetails handleOnDataTypeChange={handleOnDataTypeChange} />
        </TabPane>

        <TabPane tab="Appearance Type" key="2">
          <AppearanceType dataType={dataType} />
        </TabPane>
      </Tabs>
    </Drawer>
  );
}
