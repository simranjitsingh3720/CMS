import Profile from '../../../ui/page-components/Profile';

export default Profile;

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
      title: 'Profile',
      breadcrumb: { crumbs: [{ title: 'profile' }] },
    },
  };
}
