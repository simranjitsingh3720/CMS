import { Table } from 'antd';
import React from 'react';
import getColumns from './getColumns/getColumns';

export default function ContentTable({ tableSchema }) {
  const columns = getColumns(tableSchema);
  console.log('col ', columns);
  const data = '';

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
