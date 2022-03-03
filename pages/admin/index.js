export { default } from '../../ui/page-components/Home';

export async function getServerSideProps({ req }) {
  if (!req.session.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/signin',
      },
    };
  }
  return {
    props: {
      // title: 'Back to sign in',
      notDisplay: true,
    },
  };
}
