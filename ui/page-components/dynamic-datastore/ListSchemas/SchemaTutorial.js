import { useContext } from 'react';
import SessionContext from '../../../context/SessionContext';
import Tutorial from '../../../components/layout/Tutorial';

function SchemaTutorial() {
  const { session } = useContext(SessionContext);

  const steps = [
    {
      target: '.first-step',
      content: 'Add a new data table from here',
      disableBeacon: 'true',
    },
    {
      target: '.second-step',
      content: 'Search your data table here',
      disableBeacon: 'true',

    },
    {
      target: '#card',
      content: 'This is the format of your data table. Click on it to get more details.',
      disableBeacon: 'true',

    },
    {
      target: '.fifth-step',
      content: 'Get more options.',
      disableBeacon: 'true',

    },
  ];
  return (
    <div>
      {session
        ? session.demo.datastore && <Tutorial steps={steps} tutorialKey="datastore" /> : null}
    </div>
  );
}

export default SchemaTutorial;
