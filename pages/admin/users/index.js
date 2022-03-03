import PageUser from '../../../ui/page-components/user/PageUser';

export default PageUser;
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
      title: 'Users',
    },
  };
}
