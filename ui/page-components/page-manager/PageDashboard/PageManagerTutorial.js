import { useContext } from 'react';
import Tutorial from '../../../components/layout/Tutorial';
import SessionContext from '../../../context/SessionContext';

function PageManagerTutorial() {
  const { session } = useContext(SessionContext);
  const steps = [
    {
      target: '.first-step',
      content: 'Add a new page from here',
      disableBeacon: 'true',
      hideCloseButton: 'true',
    },
    {
      target: '.second-step',
      content: 'Search your pages here',
      disableBeacon: 'true',
      hideCloseButton: 'true',
    },
    {
      target: '#third-step',
      content: 'This is the format of your card.',
      disableBeacon: 'true',
      hideCloseButton: 'true',
    },
    {
      target: '#card',
      content: 'This is the format of your page card.',
      disableBeacon: 'true',
      hideCloseButton: 'true',
    },
    {
      target: '#section',
      content: 'Work on your page here',
      disableBeacon: 'true',
      hideCloseButton: 'true',
    },
    {
      target: '#options',
      content: 'View your page here',
      disableBeacon: 'true',
      hideCloseButton: 'true',
    },

  ];
  return (
    <div>
      {session && session.demo.pageManager && <Tutorial steps={steps} tutorialKey="pageManager" />}
    </div>
  );
}
export default PageManagerTutorial;
