import PageForgotPassword from '../../ui/page-components/auth/PageForgotPassword';

export default PageForgotPassword;

export async function getServerSideProps() {
  return {
    props: {
      notDisplay: true,
    },
  };
}
