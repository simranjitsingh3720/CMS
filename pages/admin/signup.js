import PageSignup from '../../ui/page-components/auth/PageSignup';

export default PageSignup;
export async function getServerSideProps({ req }) {
  // if (req.session.user) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/admin',
  //     },
  //   };
  // }
  return {
    props: {
      title: 'signup',
    },
  };
}
