import PageForgotPassword from '../../ui/page-components/auth/PageForgotPassword';

export default PageForgotPassword;

export async function getServerSideProps({ req }) {
  if (req.session.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin',
      },
    };
  }
  return {
    props: {
      notDisplay: true,
    },
  };
}
