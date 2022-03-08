import PageDashboard from '../../../ui/page-components/page-manager/PageDashboard';

export async function getServerSideProps() {
  return {
    props: {
      title: 'Page Manager',
      breadcrumb: { crumbs: [{ title: 'page-manager' }] },
    },
  };
}

export default PageDashboard;
