import {
  LayoutOutlined, TableOutlined, PictureOutlined, UserOutlined,
} from '@ant-design/icons';

const navData = [{
  name: 'Page-builder',
  path: '/admin/page-builder',
  icon: <LayoutOutlined />,
}, {
  name: 'Datastore',
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
