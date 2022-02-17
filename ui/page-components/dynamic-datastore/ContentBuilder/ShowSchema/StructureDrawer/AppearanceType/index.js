import { Select, Form, Input, Button, Checkbox } from 'antd';
import React, { useState } from 'react';
import { appearanceTypes } from '../../../schemaDetails';
import Option from './appearance-type-component/ValueNames';
import Switch from './appearance-type-component/Switch';

export default function AppearanceType({ dataType }) {
  const [game, setGame] = useState('');

  // console.log('s ', dataType);
  // console.log('app-> ', appearanceTypes[dataType]);
  const handleOnApperanceTypeChange = (value) => {
    console.log(value);
    setGame(value);
  };
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <div>
      <Form.Item name="appearance-type" label="Appearance Type" rules={[{ required: true }]}>
        <Select size="large" defaultvalue={appearanceTypes[dataType]} onChange={handleOnApperanceTypeChange} style={{ width: 200 }}>
          {
            ((appearanceTypes && appearanceTypes[dataType]) || []).map((appearanceType) => (
              <Option key={appearanceType} value={appearanceType}>
                {appearanceType}
              </Option>
            ))
          }
        </Select>
      </Form.Item>
      {(() => {
        switch (game) {
          case 'checkbox':
            return <Option />;
          case 'fileUpload':
            return (<Checkbox onChange={onChange}>Multiple Files</Checkbox>);

          case 'switch':
            return <Switch />;
          case 'select':
            return <Option />;
          case 'radio':
            return <Option />;
            // case 'fileUpload':
            //   return (<Checkbox onChange={onChange}>Checkbox</Checkbox>);
          case 'Boolean Radio':
            return <Switch />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
