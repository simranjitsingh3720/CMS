export { default } from '../../ui/page-components/Home';

export async function getServerSideProps() {
  return {
    props: {
      // title: 'Back to sign in',
      notDisplay: true,
    },
  };
}
