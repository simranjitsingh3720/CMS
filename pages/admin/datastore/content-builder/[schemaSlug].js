import ContentBuilder from '../../../../ui/page-components/dynamic-datastore/ContentBuilder';

export default ContentBuilder;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Datastore',
      breadcrumb: { crumbs: [{ title: 'datastore' }] },
    },
  };
}
