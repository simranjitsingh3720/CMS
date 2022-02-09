import React from 'react';

const index = () => <div>ASSESTS</div>;

export default index;
export async function getServerSideProps() {
  return {
    props: {
      title: 'Assets',
      breadcrumb: { crumbs: [{ title: 'assets' }] },
    },
  };
}
