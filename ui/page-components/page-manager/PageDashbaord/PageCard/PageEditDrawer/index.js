import React, { useEffect } from 'react';
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

function PageEditDrawer({ onFormClose, visible, setVisible, data }) {
  const [form] = Form.useForm();

  const [{ error }, executePatch] = useRequest(
    {
      url: `/page/${data.slug}`,
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
    console.log(values);
    await executePatch({
      data: {
        name: values.name || data.name,
        slug: values.slug || data.slug,
      },
    });
    if (error) {
      message.error('Page Details Not Updated');
    } else {
      form.resetFields();
      setVisible(false);
      message.success('Page Updated Successfully');
    }
  };

  function showConfirmHome(slug) {
    console.log(slug);
    confirm({
      title: 'Are you sure to Change this page to Home?',
      icon: <ExclamationCircleOutlined />,
      content: <p className={styles.modal_content}>
        After Changing this Page to Home, current Page Name will be Renamed as Home
               </p>,
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        executeHandleHome({
          url: `updateHome/${slug}`,
        });
        message.success('Home Page Updated Successfully!');
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
        content: <p className={styles.modal_content}>
          After Deleting this Page you won't be able to use this slug
                 </p>,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          handleDeletePage({
            url: `/page/${slugForDelete}`,
          });
          message.success('Page Deleted Successfully!');
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

    <Drawer title="Edit Page Details" placement="right" onClose={onFormClose} visible={visible}>

      <Form
        className={styles.drawer_form}
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={SubmitDetails}
        initialValues={{ name: data.name, slug: data.slug }}
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
        >
          <Input disabled={data.slug === ''} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16 }} className={styles.drawer_button}>
          <Button htmlType="submit" className={styles.drawer_submit}>
            Submit
          </Button>
        </Form.Item>

      </Form>

      <Form
        className={styles.drawer_form}
      >
        <Form.Item
          label={<label style={{ fontSize: 15 }}>Make this Page Home</label>}
          wrapperCol={{ offset: 12 }}
          className={styles.drawer_button}
          colon={false}
        >
          <Button type="primary" icon={<HomeOutlined />} disabled={data.slug === ''} onClick={() => { showConfirmHome(data.slug); }}>
            Make Home
          </Button>
        </Form.Item>
      </Form>

      <Form
        className={styles.drawer_form}
      >
        <Form.Item
          label={<label style={{ color: 'red', fontSize: 15 }}>Danger Zone</label>}
          wrapperCol={{ offset: 12 }}
          className={styles.drawer_button}
          colon={false}
        >
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => showConfirmDelete(data.slug)}>
            Delete Page
          </Button>
        </Form.Item>
      </Form>

    </Drawer>

  );
}
export default PageEditDrawer;
