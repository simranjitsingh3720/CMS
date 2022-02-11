import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message } from 'antd';
import { useRouter } from 'next/router';
import ActionBar from '../../../components/ActionBar';
import PageCard from './PageCard';
import PageFormDrawer from './PageFormDrawer';

function PageDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });
  const { push } = useRouter();

  const handleCreatePage = () => {
    axios.post('http://localhost:8000/api/createPage', pageDetails)
      .then(() => {
        setVisible(false);
        message.info('Page Created Successfully', 5);
        push('/admin/page-manager/builder/[pageID]', `/admin/page-manager/builder/${pageDetails.slug}`);
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

export default PageDashboard;