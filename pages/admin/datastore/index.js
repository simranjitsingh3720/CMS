import React from 'react';

const index = () => (
  <div>
    DATASTORE
  </div>
);

export default index;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Datastore',
      breadcrumb: { crumbs: [{ title: 'datastore' }] },
    },
  };
}
