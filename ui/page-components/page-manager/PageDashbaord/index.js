import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PageCard from './PageCard';
import ActionBar from '../../../components/ActionBar';
import PageFormDrawer from './PageFormDrawer';

function PageManager() {
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);

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
    <div style={{ padding: -12 }}>
      <ActionBar actions={actions} />
      <PageCard searchValue={searchValue} />
      <PageFormDrawer
        onFormClose={onClose}
        visible={visible}
        setVisible={setVisible}
      />
      <div />
    </div>
  );
}

export default PageManager;
