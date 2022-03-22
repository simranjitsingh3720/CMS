import { useContext } from 'react';
import Tutorial from '../../../components/layout/Tutorial';
import SessionContext from '../../../context/SessionContext';

function ContentTutorial() {
  const { session } = useContext(SessionContext);
  const steps = [
    {
      target: '#contents-tut',
      content: 'View the contents of your table here',
      disableBeacon: 'true',
    },
    {
      target: '#structure-tut',
      content: 'View your structure here',
      disableBeacon: 'true',
    },
    {
      target: '.first-step',
      content: 'Add new content here',
      disableBeacon: 'true',
    },
    {
      target: '.second-step',
      content: 'Search your content here',
      disableBeacon: 'true',
    },
    {
      target: '#edit-content',
      content: 'Edit your content here',
      disableBeacon: 'true',
    },
    {
      target: '#delete-content',
      content: 'Delete your content here',
      disableBeacon: 'true',
    },
  ];
  return (
    <div>
      {session && session.user.flag.datastore_contents && <Tutorial steps={steps} tutorialKey="datastore_contents" />}
    </div>
  );
}
export default ContentTutorial;
