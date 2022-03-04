import PageBuilder from '../../../../ui/page-components/page-manager/PageBuilder';

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
      notDisplay: true,
    },
  };
}

export default PageBuilder;
