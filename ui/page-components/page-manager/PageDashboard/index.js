import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PageCard from './PageCard';
import ActionBar from '../../../components/layout/ActionBar';
import PageFormModal from './PageFormModal';
import PageManagerTutorial from './PageManagerTutorial';

function PageDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
      placeholder: 'Enter Search Page',

    },
    buttons: [
      {
        name: 'Add New Page',
        icon: <PlusOutlined />,
        onClick: showModal,
      },
    ],
  };

  return (
    <>
      <PageManagerTutorial />
      <div style={{ padding: '16px' }}>
        <ActionBar actions={actions} />
        <PageCard searchValue={searchValue} />
        <PageFormModal
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
