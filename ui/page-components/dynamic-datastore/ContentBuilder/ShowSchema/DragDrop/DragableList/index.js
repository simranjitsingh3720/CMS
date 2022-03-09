import { SortableContainer } from 'react-sortable-hoc';
import DragableItem from '../DragableItem';

const DragableList = SortableContainer(({ items, fieldActions }) => {
  const steps = [
    {
      target: '#edit_structure',
      content: 'Edit your structure here',
      disableBeacon: 'true',
    },
    {
      target: '#delete_structure',
      content: 'Delete your structure here',
      disableBeacon: 'true',
    },

  ];
  return (
    <l1>
      {(items).map((value, index) => (
        <DragableItem
          key={value.id}
          index={index}
          value={value}
          fieldActions={fieldActions}
          steps={steps}
        />
      ))}
    </l1>
  );
});

export default DragableList;
