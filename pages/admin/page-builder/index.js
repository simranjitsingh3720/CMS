import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Actionbar from '../../../ui/page-components/components/ActionBar/ActionBar';
import PageManager from '../../../ui/page-components/page-manager';

function Index() {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // make api call according to searchvalue
  }, [searchValue]);

  const handleCreateNewPage = () => {
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
    },
    buttons: [{
      name: 'New page',
      icon: <PlusOutlined />,
      onClick: handleCreateNewPage,
    }],
  };

  return (
    <div>
      <Actionbar actions={actions} />
      <PageManager />

    </div>
  );
}

export default Index;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Page Manager',
      breadcrumb: { crumbs: [{ title: 'page-manager' }] },
    },
  };
}
