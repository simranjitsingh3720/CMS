import { useContext } from 'react';
import SessionContext from '../../../context/SessionContext';
import Tutorial from '../../../components/layout/Tutorial';

function SchemaTutorial() {
  const { session } = useContext(SessionContext);

  const steps = [
    {
      target: '.first-step',
      content: 'This button is used to add new schema',
      disableBeacon: 'true',
    },
    {
      target: '.second-step',
      content: 'This is search bar which help us to get required schema',
      disableBeacon: 'true',

    },
    {
      target: '#card',
      content: 'This is format of schema you added and also onclick you will get details',
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
