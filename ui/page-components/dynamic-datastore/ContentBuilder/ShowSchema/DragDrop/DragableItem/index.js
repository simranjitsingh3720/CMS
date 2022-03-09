import { SortableElement } from 'react-sortable-hoc';
import FieldCard from '../../FieldCard';
import DragHandler from '../DragHandler';

const DragableItem = SortableElement(({ value, fieldActions }) => (

  <li style={{
    display: 'flex', backgroundColor: '#fff', borderRadius: '15px', paddingLeft: '20px', marginBottom: '3px', justifyContent: 'inline', border: '3px solid #f0f0f0', alignItems: 'center',
  }}
  >
    <DragHandler />
    <FieldCard
      setIsEditSchemaDrawer={fieldActions.setEditSchemaDrawer}
      onClose={fieldActions.closeSchemaDrawer}
      key={value.id}
      id={value.id}
      fields={value}
      fieldSlug={value.id}
      setFieldsId={fieldActions.setFieldsId}
      setIsEditable={fieldActions.setIsEditable}
      setFieldData={fieldActions.setFieldData}
      deleteField={fieldActions.deleteField}
    />
  </li>
));

export default DragableItem;
