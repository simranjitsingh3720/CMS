import React, { useEffect } from 'react';
import {
  Form, Input, Button, message, Modal, Space,
} from 'antd';
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import styles from '../style.module.scss';
import { useRequest } from '../../../../../helpers/request-helper';

const { confirm } = Modal;

function PageEditModal({ onFormClose, visible, setVisible, pageData, fetch }) {
  const [form] = Form.useForm();

  const [{ }, executePatch] = useRequest(
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

  const submitDetails = async (values) => {
    await executePatch({
      data: {
        name: values.name,
        slug: values.slug,
      },
    })
      .then(() => {
        setVisible(false);
        message.success('Page Updated Successfully');
        // setTimeout(() => {
        fetch();
        // }, 1000);
      })
      .catch((err) => {
        message.info(err.response.data.message || err.response.data.messages[0]);
      });
  };

  function showConfirmHome(slug) {
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
        }).then(() => {
          message.success('Home Page Updated Successfully!');
          setVisible(false);
          setTimeout(() => {
            fetch();
          }, 1000);
        }).catch((err) => {
          message.error(err.response.data.message || err.response.data.messages[0]);
        });
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
    if (slugForDelete === '') {
      Modal.error({
        title: 'Home Page cannot be deleted...',
        okText: 'OK',
        okType: 'danger',
      });
    } else {
      confirm({
        title: 'Are you sure to delete this page?',
        icon: <ExclamationCircleOutlined style={{ color: 'rgb(214, 40, 40)' }} />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          handleDeletePage({
            url: `/page/${slugForDelete}`,
          }).then((re) => {
            message.success('Page Deleted Successfully!');
            setVisible(false);
            setTimeout(() => {
              fetch();
            }, 1000);
          }).catch((err) => {
            message.error(err.response.data.message || err.response.data.messages[0]);
          });
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
      title={`Edit ${pageData.name} page`}
      onCancel={onFormClose}
      visible={visible}
      footer={null}
    >
      <Form
        className={styles.drawer_form}
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        onFinish={submitDetails}
        layout="vertical"
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

        <Form.Item wrapperCol={{ offset: 15 }}>
          <div className={styles.actionButton}>
            <Space wrap>
              <Button key="back" onClick={onFormClose}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.drawer_submit}
              >
                Submit
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>

      <Form className={styles.drawer_form}>
        <Form.Item
          label={<label style={{ fontSize: 15 }}>Make this Page Home</label>}
          wrapperCol={{ offset: 8 }}
          colon={false}
          style={{ marginBottom: '4px' }}
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
          wrapperCol={{ offset: 11 }}
          className={styles.drawer_button}
          colon={false}
          style={{ marginBottom: '4px' }}

        >
          <Button
            // type="danger"
            danger
            ghost
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
export default PageEditModal;
