import { MenuOutlined } from '@ant-design/icons';
import { sortableHandle } from 'react-sortable-hoc';

// DragHandle
const DragHandler = sortableHandle(() => (
  <span style={{ marginTop: '30px', opacity: '.3', cursor: 'row-resize' }}>
    <MenuOutlined style={{ fontSize: '17px' }} />
  </span>
));

export default DragHandler;
