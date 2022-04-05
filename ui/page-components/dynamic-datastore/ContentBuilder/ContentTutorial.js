import { useContext } from 'react';
import Tutorial from '../../../components/layout/Tutorial';
import SessionContext from '../../../context/SessionContext';

function ContentTutorial() {
  const { session } = useContext(SessionContext);
  const steps = [
    {
      target: '#contents-tut',
      content: 'View the contents of your table here.',
      disableBeacon: 'true',
    },
    {
      target: '.first-step',
      content: 'Add a new content here.',
      disableBeacon: 'true',
    },
    {
      target: '.select',
      content: 'Select the columns to be displayed.',
      disableBeacon: 'true',
    },
    {
      target: '#edit-content',
      content: 'Edit your content here.',
      disableBeacon: 'true',
    },
    {
      target: '#delete-content',
      content: 'Delete your content here.',
      disableBeacon: 'true',
    },
  ];
  return (
    <div>
      {session && session.demo.datastoreContents && <Tutorial steps={steps} tutorialKey="datastoreContents" />}
    </div>
  );
}
export default ContentTutorial;
