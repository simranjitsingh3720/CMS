import {
  LayoutOutlined, TableOutlined, PictureOutlined, FormOutlined, DatabaseOutlined,
} from '@ant-design/icons';

const navData = [{
  name: 'page-builder',
  path: '/page-builder',
  icon: <LayoutOutlined />,
}, {
  name: 'content-manager',
  path: '/content-manager',
  icon: <TableOutlined />,
},
{
  name: 'content-builder',
  path: '/content-builder',
  icon: <DatabaseOutlined />,
},
{
  name: 'form-builder',
  path: '/form-builder',
  icon: <FormOutlined />,
},
{
  name: 'assets',
  path: '/assets',
  icon: <PictureOutlined />
  ,
},
];
export default navData;
