import ContentBuilder from '../../../../ui/page-components/dynamic-datastore/ContentBuilder';

export default ContentBuilder;

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
      title: 'Datastore',
      breadcrumb: { crumbs: [{ title: 'datastore' }] },
    },
  };
}
