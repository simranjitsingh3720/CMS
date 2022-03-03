import PageSignin from '../../ui/page-components/auth/PageSignin';

export default PageSignin;
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
      title: 'signin',
    },
  };
}
