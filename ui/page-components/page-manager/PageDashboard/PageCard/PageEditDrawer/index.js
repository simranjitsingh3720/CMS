import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, message, Drawer, Modal,
} from 'antd';
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import styles from '../style.module.scss';
import { useRequest } from '../../../../../helpers/request-helper';

const { confirm } = Modal;

function PageEditDrawer({ onFormClose, visible, setVisible, pageData, fetch }) {
  const [form] = Form.useForm();

  const [{ data }, refetch] = useRequest({
    url: '/page/',
    method: 'GET',
    params: {
      q: '',
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [{ error }, executePatch] = useRequest(
    {
      url: `/page/${pageData.slug}`,
      method: 'PATCH',
    },
    { manual: true },
  );
  const [{ data: homeData }, executeHandleHome] = useRequest(
    {
      method: 'POST',
    },
    {
      manual: true,
    },
  );
  const SubmitDetails = async (values) => {
    await executePatch({
      data: {
        name: values.name || pageData.name,
        slug: values.slug || pageData.slug,
      },
    })
      .then(() => {
        form.resetFields();
        setVisible(false);
        message.success('Page Updated Successfully');
        setTimeout(() => {
          fetch();
        }, 1000);
      })
      .catch((err) => {
        message.info('Slug Name Already Taken');
        console.log(err);
      });
  };

  function showConfirmHome(slug) {
    console.log(slug);
    confirm({
      title: 'Are you sure to Change this page to Home?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <p className={styles.modal_content}>
          After Changing this Page to Home, current Page Name will be Renamed as
          Home
        </p>
      ),
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        executeHandleHome({
          url: `updateHome/${slug}`,
        });
        message.success('Home Page Updated Successfully!');
        setVisible(false);
        setTimeout(() => {
          fetch();
        }, 1000);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const [{ data: deleteData }, handleDeletePage] = useRequest(
    {
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );

  function showConfirmDelete(slugForDelete) {
    console.log(slugForDelete);
    if (slugForDelete === '') {
      Modal.error({
        title: 'Home Page cannot be deleted...',
        okText: 'OK',
        okType: 'danger',
      });
    } else {
      confirm({
        title: 'Are you sure to delete this page?',
        icon: <ExclamationCircleOutlined />,
        content: (
          <p className={styles.modal_content}>
            After Deleting this Page you won't be able to use this slug
          </p>
        ),
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          handleDeletePage({
            url: `/page/${slugForDelete}`,
          });
          message.success('Page Deleted Successfully!');
          setVisible(false);
          setTimeout(() => {
            fetch();
          }, 1000);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }

  useEffect(() => {
    form.resetFields();
  }, [executePatch, form, deleteData, homeData]);

  return (
    <Modal
      title="Edit Page Details"
      onCancel={onFormClose}
      visible={visible}
      footer={[
        <Button key="back" onClick={onFormClose}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        className={styles.drawer_form}
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        onFinish={SubmitDetails}
        initialValues={{ name: pageData.name, slug: pageData.slug }}
      >
        <Form.Item
          label="Page Name"
          name="name"
          rules={[{ required: true, message: 'Please enter Page Name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            {
              required: pageData.slug !== '',
              message: 'Please enter the slug!',
            },
            {
              pattern: new RegExp('^[A-Za-z0-9]*$'),
              message: 'Only Letters and Numbers are accepted',
            },
          ]}
        >
          <Input disabled={pageData.slug === ''} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16 }} className={styles.drawer_button}>
          <Button htmlType="submit" className={styles.drawer_submit}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Form className={styles.drawer_form}>
        <Form.Item
          label={<label style={{ fontSize: 15 }}>Make this Page Home</label>}
          wrapperCol={{ offset: 7 }}
          className={styles.drawer_button}
          colon={false}
        >
          <Button
            type="primary"
            icon={<HomeOutlined />}
            disabled={pageData.slug === ''}
            onClick={() => {
              showConfirmHome(pageData.slug);
            }}
          >
            Make Home
          </Button>
        </Form.Item>
      </Form>

      <Form className={styles.drawer_form}>
        <Form.Item
          label={
            <label style={{ color: 'red', fontSize: 15 }}>Danger Zone</label>
          }
          wrapperCol={{ offset: 10 }}
          className={styles.drawer_button}
          colon={false}
        >
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => showConfirmDelete(pageData.slug)}
          >
            Delete Page
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default PageEditDrawer;
