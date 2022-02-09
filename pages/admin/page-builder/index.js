import React from 'react';

const index = () => (
  <div />
);

export default index;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Page Manager',
      breadcrumb: { crumbs: [{ title: 'page-manager' }] },
    },
  };
}
