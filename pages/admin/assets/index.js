import PageAsset from '../../../ui/page-components/asset/PageAsset';

export default PageAsset;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Assets',
      breadcrumb: { crumbs: [{ title: 'assets' }] },
    },
  };
}
