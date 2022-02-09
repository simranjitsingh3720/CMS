import Asset from '../../../ui/page-components/asset-components';

export default Asset;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Assets',
      breadcrumb: { crumbs: [{ title: 'assets' }] },
    },
  };
}
