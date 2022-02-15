import { Select } from 'antd';
import React from 'react';
import { appearanceTypes } from '../../../schemaDetails';

const { Option } = Select;

export default function AppearanceType({ dataType }) {
  console.log('s ', dataType);
  const handleOnApperanceTypeChange = (value) => {
    console.log(value);
  };
  return (
    <div>
      <Select size="large" onChange={handleOnApperanceTypeChange} style={{ width: 200 }}>
        {
            appearanceTypes[dataType].map((appearanceType) => (
              <Option key={appearanceType}>
                {appearanceType}
              </Option>
            ))
          }
      </Select>
    </div>
  );
}
