import ContentBuilder from '../../../../ui/page-components/dynamic-datastore/ContentBuilder';

export default ContentBuilder;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Data Table',
      breadcrumb: { crumbs: [{ title: 'Data table' }] },
    },
  };
}
