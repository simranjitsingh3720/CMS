import { useContext } from 'react';
import Tutorial from '../../components/layout/Tutorial';
import SessionContext from '../../context/SessionContext';

function AssetTutorial() {
  const { session } = useContext(SessionContext);
  const steps = [
    {
      target: '.first-step',
      content: 'Add a new asset from here.',
      disableBeacon: 'true',

    },
    {
      target: '.second-step',
      content: 'Search your assets.',
      disableBeacon: 'true',
    },
    {
      target: '#card',
      content: 'This is your asset.',
      disableBeacon: 'true',
    },
    {
      target: '#options',
      content: 'Get more options here.',
      disableBeacon: 'true',
    },
  ];

  return (
    <div>
      {session && session.demo.asset
      && <Tutorial steps={steps} tutorialKey="asset" />}
    </div>
  );
}
export default AssetTutorial;
