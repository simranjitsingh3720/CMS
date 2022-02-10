import React from 'react';

const index = () => <div>USERS</div>;

export default index;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Users',
      breadcrumb: { crumbs: [{ title: 'users' }] },
    },
  };
}
