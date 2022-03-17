import {
  LayoutOutlined, TableOutlined, PictureOutlined, UserOutlined, HomeOutlined,
} from '@ant-design/icons';

const navData = [{
  name: 'Home Page',
  path: '/',
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
export default navData;
