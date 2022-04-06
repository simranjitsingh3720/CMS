import { SortableContainer } from 'react-sortable-hoc';
import FieldTutorial from '../../../FieldTutorial';
import DragableItem from '../DragableItem';

const DragableList = SortableContainer(({ items, fieldActions }) => (
  <ul style={{ padding: '0' }}>
    <FieldTutorial />
    {(items).map((value, index) => (
      <DragableItem
        key={value.id}
        index={index}
        value={value}
        fieldActions={fieldActions}
      />
    ))}
  </ul>
));

export default DragableList;
