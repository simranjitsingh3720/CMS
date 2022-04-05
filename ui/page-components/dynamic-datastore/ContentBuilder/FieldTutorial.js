import { useContext } from 'react';
import Tutorial from '../../../components/layout/Tutorial';
import SessionContext from '../../../context/SessionContext';

function FieldTutorial() {
  const { session } = useContext(SessionContext);
  const steps = [
    {
      target: '#structure-tut',
      content: 'View your structure here',
      disableBeacon: 'true',
    },
    {
      target: '.first-step',
      content: 'Add new structure here',
      disableBeacon: 'true',
    },
    {
      target: '.share',
      content: 'Share your structure as a form',
      disableBeacon: 'true',
    },
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
