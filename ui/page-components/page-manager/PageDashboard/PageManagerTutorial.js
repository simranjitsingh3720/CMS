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
      content: 'Search your page here',
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
      target: '#fourth-step',
      content: 'Work on your page here',
      disableBeacon: 'true',
      hideCloseButton: 'true',
    },
    {
      target: '#fifth-step',
      content: 'View your page here',
      disableBeacon: 'true',
      hideCloseButton: 'true',
    },
    {
      target: '#sixth-step',
      content: 'Edit your page here',
      disableBeacon: 'true',
      hideCloseButton: 'true',
    },
  ];
  return (
    <div>
      {session && session.user.flag.page_manager && <Tutorial steps={steps} tutorialKey="page_manager" />}
    </div>
  );
}
export default PageManagerTutorial;
