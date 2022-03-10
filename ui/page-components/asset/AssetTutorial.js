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
      target: '.third-step',
      content: 'Edit your asset from here',
      disableBeacon: 'true',
    },
    {
      target: '.fourth-step',
      content: 'Delete your asset from here',
      disableBeacon: 'true',
    },
  ];

  return (
    <div>
      {session && session.user.flag.asset
      && <Tutorial steps={steps} tutorialKey="asset" />}
    </div>
  );
}
export default AssetTutorial;
