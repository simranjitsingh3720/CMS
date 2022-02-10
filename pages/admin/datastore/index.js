import ListSchema from '../../../ui/page-components/dynamic-datastore/ListSchemas';

export default ListSchema;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Datastore',
      breadcrumb: { crumbs: [{ title: 'datastore' }] },
    },
  };
}
