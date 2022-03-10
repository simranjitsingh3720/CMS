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
        && session.user.flag.datastore_structure
        && <Tutorial steps={steps} tutorialKey="datastore_structure" />}
    </div>
  );
}
export default FieldTutorial;
