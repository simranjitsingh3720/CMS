import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message } from 'antd';
import ActionBar from '../../../components/ActionBar';
import PageCard from './PageCard';
import PageFormDrawer from './PageFormDrawer';

function PageManager() {
  const [searchValue, setSearchValue] = useState('');
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

  const handleCreatePage = () => {
    axios.post('http://localhost:8000/api/createPage', pageDetails)
      .then(() => {
        setVisible(false);
        message.info('Page Created Successfully', 5);
      })
      .catch((err) => {
        console.log('Error => ', err);
      });
  };

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
    <div>
      <ActionBar actions={actions} />
      <PageCard handleCreatePage={handleCreatePage} searchValue={searchValue} />
      <PageFormDrawer
        onFormClose={onClose}
        pageDetails={pageDetails}
        setPageDetails={setPageDetails}
        visible={visible}
        setVisible={setVisible}
        handleCreatePage={handleCreatePage}
      />
      <div />
    </div>
  );
}

export default PageManager;
