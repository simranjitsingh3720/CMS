import PageBuilder from '../../../../ui/page-components/page-manager/PageBuilder';

export async function getServerSideProps() {
  return {
    props: {
      title: 'Page Editor',
    },
  };
}

export default PageBuilder;
