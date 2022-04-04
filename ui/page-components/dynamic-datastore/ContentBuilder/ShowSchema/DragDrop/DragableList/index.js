import { SortableContainer } from 'react-sortable-hoc';
import FieldTutorial from '../../../FieldTutorial';
import DragableItem from '../DragableItem';

const DragableList = SortableContainer(({ items, fieldActions }) => (
  <>
    <FieldTutorial />
    <l1>
      {(items).map((value, index) => (
        <div>
          <DragableItem
            key={value.id}
            index={index}
            value={value}
            fieldActions={fieldActions}
          />
        </div>
      ))}
    </l1>
  </>
));

export default DragableList;
