import PageForgotPassword from '../../ui/page-components/auth/PageForgotPassword';

export default PageForgotPassword;

export async function getServerSideProps() {
  return {
    props: {
      // title: 'Back to sign in',
      notDisplay: true,
    },
  };
}
