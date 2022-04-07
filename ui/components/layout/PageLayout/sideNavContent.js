import {
  LayoutOutlined, TableOutlined, PictureOutlined, UserOutlined, HomeOutlined,
} from '@ant-design/icons';

const navRoute = ['/admin', '/admin/page-manager', '/admin/datastore', '/admin/assets', '/admin/users'];

const navData = [{
  name: 'Home',
  path: '/admin',
  icon: <HomeOutlined />,
},
{
  name: 'Page Manager',
  path: '/admin/page-manager',
  icon: <LayoutOutlined />,
}, {
  name: 'Data Table',
  path: '/admin/datastore',
  icon: <TableOutlined />,
},
{
  name: 'Assets',
  path: '/admin/assets',
  icon: <PictureOutlined />,
},
{
  name: 'Users',
  path: '/admin/users',
  icon: <UserOutlined />,

},

];
export { navRoute };
export default navData;
