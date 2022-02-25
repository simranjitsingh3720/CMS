import PagePasswordRecovery from '../../ui/page-components/auth/PagePasswordRecovery';

export default PagePasswordRecovery;
export async function getServerSideProps() {
  return {
    props: {
      // title: 'Back to sign in',
      notDisplay: true,
    },
  };
}
