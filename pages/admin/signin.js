import PageSignin from '../../ui/page-components/auth/PageSignin';

export default PageSignin;
export async function getServerSideProps() {
  return {
    props: {
      title: 'signin',
    },
  };
}
