import { Drawer, Tabs } from 'antd';
import React, { useState } from 'react';
import AppearanceType from './AppearanceType';
import FieldDetails from './FieldDetails';

const { TabPane } = Tabs;

export default function StructureDrawer({ closeSchemaDrawer, setIsSchemaDrawer, size }) {
  const [dataType, setDataType] = useState('text');
  const [appearanceType, setAppearanceType] = useState('');
  console.log('ss ', dataType);
  const handleOnDataTypeChange = (value) => {
    console.log('handleOn Data ', value);
    setDataType(value);
  };

  const handleOnApperanceTypeChange = (value) => {
    console.log('app value - > ', value);
    setAppearanceType(value);
  };

  return (
    <Drawer title="Create a new field" placement="right" onClose={closeSchemaDrawer} size="large" visible>
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="Field Details" key="1">
          <FieldDetails handleOnDataTypeChange={handleOnDataTypeChange} appearanceType={appearanceType} />
        </TabPane>

        <TabPane tab="Appearance Type" key="2">
          <AppearanceType dataType={dataType} handleOnApperanceTypeChange={handleOnApperanceTypeChange} />
        </TabPane>
      </Tabs>
    </Drawer>
  );
}
