import {
  PlusOutlined,
  DeleteOutlined,
  ExpandAltOutlined,
  FormOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Button, Card, Avatar, Drawer, Form, Input, message, Image, Tooltip,
} from 'antd';
import Actionbar from '../components/ActionBar/ActionBar';

const { Meta } = Card;

function Index() {
  const [searchValue, setSearchValue] = useState('');

  const [pages, setPages] = useState([]);
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

  const { push } = useRouter();

  const handleCreatePage = () => {
    // e.preventDefault();
    axios.post('http://localhost:8000/api/createPage', pageDetails)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        setVisible(false);
        message.info('Page Created Successfully', 5);
      })
      .catch((err) => {
        console.log('Error => ', err);
      });
  };

  const handleDelete = (newSlug) => {
    axios.delete(`http://localhost:8000/api/page/${newSlug}`).then(() => {
      console.log('Hi');
    });
    message.warning('Page Deleted Successfully', 5);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/page').then((res) => {
      setPages(res.data.list);
    });
  }, []);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleEdit = (newSlug) => {
    push('/page-builder/[pageID]', `/page-builder/${newSlug}`);
  };

  const handleView = (newSlug) => {
    push('/[pageView]', `/${newSlug}`);
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
    },
    buttons: [{
      name: 'New page',
      icon: <PlusOutlined />,
      onClick: showDrawer,
    }],
  };

  return (
    <div>
      <Actionbar actions={actions} />
      <div className="card-container">
        {pages.map((page, i) => (
          <div className="card-component" key={i}>
            <Card
              style={{ width: 300 }}
              cover={(
                <Image
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              )}
              actions={[
                <Tooltip title="View Page">
                  <ExpandAltOutlined key="view" onClick={() => { handleView(page.slug); }} />
                </Tooltip>,
                <Tooltip title="Edit Page">
                  <FormOutlined key="edit" onClick={() => { handleEdit(page.slug); }} />
                </Tooltip>,
                <Tooltip title="Delete Page">
                  <DeleteOutlined key="delete" onClick={() => { handleDelete(page.slug); }} />
                </Tooltip>,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={page.name}
                description={[<span>Slug: </span>, <span>{page.slug}</span>]}
              />
            </Card>
          </div>
        ))}
      </div>

      <Drawer title="Create New Page" placement="right" onClose={onClose} visible={visible}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Page Name"
            name="page"
            value={pageDetails.name}
            onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
            rules={[{ required: true, message: 'Please enter Page Name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            value={pageDetails.slug}
            onChange={(e) => setPageDetails({ ...pageDetails, slug: e.target.value })}
            rules={[{ required: true, message: 'Please enter Page Slug!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleCreatePage}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <div />
    </div>
  );
}

export default Index;
