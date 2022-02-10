import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Drawer, Form, Input,
  Card, Avatar,
} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const [visible, setVisible] = useState(false);

  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

  const { push } = useRouter();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  function showDrawer() {
    setVisible(true);
  }

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/page').then((res) => {
      setPages(res.data.list);
    });
  }, []);

  const handleClick = (newSlug) => {
    push('/admin/page-builder/[pageID]', `/admin/page-builder/${newSlug}`);
  };

  const handlePreview = (newSlug) => {
    push('/[pageView]', `/${newSlug}`);
  };

  const Cards = pages.map((page) => (
    <div>
      <Card
        style={{ width: 300 }}
        cover={(
          <img
            alt="example"
            src="https://assets-global.website-files.com/5e57ba59552cf400c593fd16/5e7fbdeb3efd72446c9d54b7_5e7fbc1243a59ded3e14959c_placeholder.jpeg"
          />
    )}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={page.name}
          description={[<span>/</span>, <span>{page.slug}</span>]}
        />
      </Card>
    </div>

    // <li
    //   key={page.slug}
    //   style={{
    //     display: 'flex', justifyContent: 'space-between', width: '50vw', border: '1px solid black', padding: '10px', margin: '5px', borderRadius: '10px',
    //   }}
    // >
    //   <span>
    //     {page.name}
    //   </span>
    //   <Button onClick={() => { handleClick(page.slug); }} style={{ cursor: 'pointer' }} type="primary">Edit</Button>
    //   <Button onClick={() => { handlePreview(page.slug); }} style={{ cursor: 'pointer' }} type="primary">Preview</Button>
    // </li>
  ));

  const handleCreatePage = (e) => {
    // e.preventDefault();
    axios.post('http://localhost:8000/api/createPage', pageDetails)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Error => ', err);
      });
  };

  return (
    <div>
      {/* <form>
        <input
          type="text"
          name="page"
          value={pageDetails.name}
          onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
          style={{ padding: '5px 10px', fontSize: '18px' }}
          placeholder="Enter name of page"
        />

        <input
          type="text"
          name="slug"
          value={pageDetails.slug}
          onChange={(e) => setPageDetails({ ...pageDetails, slug: e.target.value })}
          style={{ padding: '5px 10px', fontSize: '18px' }}
          placeholder="Enter name of slug"
        />

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }} onClick={handleCreatePage}>Create New Page</button>
      </form> */}

      <ul style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {Cards}
      </ul>
      <div />
      {/* <Button type="primary" onClick={showDrawer}>
        New Page
      </Button> */}

      <Drawer title="Add New Page" placement="right" onClose={onClose} visible={visible}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
            name="name"
            label="Name"
            value={pageDetails.name}
            onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            value={pageDetails.slug}
            onChange={(e) => setPageDetails({ ...pageDetails, slug: e.target.value })}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" onClick={handleCreatePage}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

// import React, { useState } from 'react';
// import {
//   Drawer, Button, Form, Input,
// } from 'antd';
// import axios from 'axios';

// function PageManager() {
//   const [visible, setVisible] = useState(false);
//   const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

//   const layout = {
//     labelCol: {
//       span: 8,
//     },
//     wrapperCol: {
//       span: 16,
//     },
//   };

//   const validateMessages = {
//     required: '${label} is required!',
//     types: {
//       email: '${label} is not a valid email!',
//       number: '${label} is not a valid number!',
//     },
//     number: {
//       range: '${label} must be between ${min} and ${max}',
//     },
//   };

//   const showDrawer = () => {
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//   };

//   const onFinish = (values) => {
//     console.log(values);
//   };

//   const handleCreatePage = (e) => {
//     // e.preventDefault();
//     console.log(pageDetails);
//     axios.post('http://localhost:8000/api/createPage', pageDetails)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log('Error => ', err);
//       });
//   };

//   // console.log(pageDetails);
//   return (
//     <>
//       <Button type="primary" onClick={showDrawer}>
//         New Page
//       </Button>
//       <Drawer title="Add New Page" placement="right" onClose={onClose} visible={visible}>
//         <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
//           <Form.Item
//             name="name"
//             label="Name"
//             value={pageDetails.name}
//             onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="slug"
//             label="Slug"
//             value={pageDetails.slug}
//             onChange={(e) => setPageDetails({ ...pageDetails, slug: e.target.value })}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//             <Button type="primary" htmlType="submit" onClick={handleCreatePage}>
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Drawer>

//     </>
//   );
// }

// export default PageManager;
