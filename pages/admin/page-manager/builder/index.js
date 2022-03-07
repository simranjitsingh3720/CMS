import Home from '../../../../ui/page-components/page-manager/PageBuilder/home';

export async function getServerSideProps() {
  return {
    props: {
      notDisplay: true,
    },
  };
}

export default Home;
