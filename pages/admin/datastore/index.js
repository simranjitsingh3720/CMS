import SchemaCard from '../../../ui/page-components/dynamic-datastore/ListSchemas/SchemaCard';

export default SchemaCard;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Datastore',
      breadcrumb: { crumbs: [{ title: 'datastore' }] },
    },
  };
}
