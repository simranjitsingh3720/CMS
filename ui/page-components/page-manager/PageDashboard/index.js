import React, { useState, useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PageCard from './PageCard';
import ActionBar from '../../../components/layout/ActionBar';
import PageFormDrawer from './PageFormDrawer';
import Tutorial from '../../../components/layout/Tutorial';
import SessionContext from '../../../context/SessionContext';

function PageDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);
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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
    },
    buttons: [{
      name: 'New page',
      icon: <PlusOutlined />,
      onClick: showDrawer,
    }],
  };

  return (
    <>
      {session && session.user.flag.page_manager && <Tutorial steps={steps} tutorialKey="page_manager" />}
      <div style={{ padding: '16px' }}>
        <ActionBar actions={actions} />
        <PageCard searchValue={searchValue} />
        <PageFormDrawer
          onFormClose={onClose}
          visible={visible}
          setVisible={setVisible}
        />
        <div />
      </div>
    </>
  );
}

export default PageDashboard;
