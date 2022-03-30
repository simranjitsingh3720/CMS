import { useContext } from 'react';
import Tutorial from '../../../components/layout/Tutorial';
import SessionContext from '../../../context/SessionContext';

function FieldTutorial() {
  const { session } = useContext(SessionContext);
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
    <div>
      {session
        && session.demo.datastoreStructure
        && <Tutorial steps={steps} tutorialKey="datastoreStructure" />}
    </div>
  );
}
export default FieldTutorial;
