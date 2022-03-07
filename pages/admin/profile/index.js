import Profile from '../../../ui/page-components/Profile';

export default Profile;

export async function getServerSideProps() {
  return {
    props: {
      title: 'Profile',
      breadcrumb: { crumbs: [{ title: 'profile' }] },
    },
  };
}
