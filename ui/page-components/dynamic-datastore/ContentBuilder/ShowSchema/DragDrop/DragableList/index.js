import { SortableContainer } from 'react-sortable-hoc';
import DragableItem from '../DragableItem';
// SortableList
const DragableList = SortableContainer(({ items, fieldActions }) => (
  <l1>
    {(items).map((value, index) => (
      <DragableItem key={value.id} index={index} value={value} fieldActions={fieldActions} />
    ))}
  </l1>
));

export default DragableList;
