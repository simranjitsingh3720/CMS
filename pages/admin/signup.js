import PageSignup from '../../ui/page-components/auth/PageSignup';

export default PageSignup;
export async function getServerSideProps() {
  return {
    props: {
      title: 'signup',
    },
  };
}
