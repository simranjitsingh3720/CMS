import PageUser from '../../../ui/page-components/auth/PageUser';

export default PageUser;
export async function getServerSideProps() {
  return {
    props: {
      title: 'Users',
    },
  };
}
