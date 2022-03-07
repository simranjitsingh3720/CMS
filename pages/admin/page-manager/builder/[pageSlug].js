import PageBuilder from '../../../../ui/page-components/page-manager/PageBuilder';

export async function getServerSideProps() {
  return {
    props: {
      notDisplay: true,
    },
  };
}

export default PageBuilder;
