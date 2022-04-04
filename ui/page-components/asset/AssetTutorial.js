import { useContext } from 'react';
import Tutorial from '../../components/layout/Tutorial';
import SessionContext from '../../context/SessionContext';

function AssetTutorial() {
  const { session } = useContext(SessionContext);
  const steps = [
    {
      target: '.first-step',
      content: 'Add your assets from here',
      disableBeacon: 'true',

    },
    {
      target: '.second-step',
      content: 'Search your assets here',
      disableBeacon: 'true',
    },
    {
      target: '#card',
      content: 'Asset Card',
      disableBeacon: 'true',
    },
    {
      target: '#options',
      content: 'Options',
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
