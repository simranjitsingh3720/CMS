import ListSchema from '../../../ui/page-components/dynamic-datastore/ListSchemas';

export default ListSchema;

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
