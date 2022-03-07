import PageDashboard from '../../../ui/page-components/page-manager/PageDashbaord';

export async function getServerSideProps() {
  return {
    props: {
      title: 'Page Manager',
      breadcrumb: { crumbs: [{ title: 'page-manager' }] },
    },
  };
}

export default PageDashboard;
