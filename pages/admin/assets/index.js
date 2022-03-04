import PageAsset from '../../../ui/page-components/asset/PageAsset';

export default PageAsset;

export async function getServerSideProps({ req }) {
  // if (!req.session.user) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/admin/signin',
  //     },
  //   };
  // }
  return {
    props: {
      title: 'Assets',
      breadcrumb: { crumbs: [{ title: 'assets' }] },
    },
  };
}
