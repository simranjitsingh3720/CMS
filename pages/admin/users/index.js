import PageUser from '../../../ui/page-components/user/PageUser';

export default PageUser;
export async function getServerSideProps() {
  return {
    props: {
      title: 'Users',
    },
  };
}
