import React, { useState } from 'react';
import {
  Drawer, Button, Form, Input,
} from 'antd';
import axios from 'axios';

function PageManager() {
  const [visible, setVisible] = useState(false);
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const handleCreatePage = (e) => {
    // e.preventDefault();
    console.log(pageDetails);
    axios.post('http://localhost:8000/api/createPage', pageDetails)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Error => ', err);
      });
  };

  // console.log(pageDetails);
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        New Page
      </Button>
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

    </>
  );
}

export default PageManager;
