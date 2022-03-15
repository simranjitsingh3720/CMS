import { request } from '../ui/helpers/request-helper';
import PageRender from '../ui/page-components/page-manager/PageRender/home';

export default PageRender;

export async function getServerSideProps() {
  const res = await request.get('/page/?isHome=1');
  return {
    props: {
      data: res.data,
    },
  };
}
