import { useContext } from 'react';
import SessionContext from '../../../context/SessionContext';
import Tutorial from '../../../components/layout/Tutorial';

function SchemaTutorial() {
  const { session } = useContext(SessionContext);

  const steps = [
    {
      target: '.first-step',
      content: 'Add your new data table from here',
      disableBeacon: 'true',
    },
    {
      target: '.second-step',
      content: 'Search your schema here',
      disableBeacon: 'true',

    },
    {
      target: '#card',
      content: 'This is format of your schema. Click on it to get details.',
      disableBeacon: 'true',

    },
    {
      target: '.fifth-step',
      content: 'From here you will get the options',
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
