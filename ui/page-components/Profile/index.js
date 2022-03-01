import {
  Card, Form, Input, Button, message, Upload, Avatar,
} from 'antd';
import { LoadingOutlined, UserAddOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useRequest } from '../../helpers/request-helper';
import styles from './styles.module.scss';

function Profile() {
  const [form] = Form.useForm();
  const [dataForm] = Form.useForm();

  const [data, setData] = useState({});
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 17,
    },
  };

  const [{ data: getdata }, handleGet, refetch] = useRequest({
    METHOD: 'GET',
    url: '/user/me',
  });

  useEffect(() => {
    handleGet()
      .then((res) => {
        setData(res.data.user);
        dataForm.setFieldsValue({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          phone: res.data.user.phone,
        });
        if (res.data.user.Asset) { setUrl(res.data.user.Asset.url); }
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  const [{ loading: detailsLoading },
    detailPatch,
  ] = useRequest(
    {
      method: 'PATCH',
    },
    { manual: true },
  );
  const [{ loading: passwordLoading },
    passwordPatch,
  ] = useRequest(
    {
      method: 'PATCH',
    },
    { manual: true },
  );

  const SubmitDetails = (values) => {
    detailPatch({
      url: `/user/${data.id}`,
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,

      },
    })
      .then(() => {
        message.success('User Updated');
        refetch();
      })
      .catch(() => {
        message.error('User Not Updated');
      });
  };

  const changePassword = (values) => {
    passwordPatch({
      url: '/user',
      data: {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
    })
      .then(() => {
        form.resetFields();
        message.success('successfully updated');
      })
      .catch(() => {
        form.resetFields();
        message.error('Password is not updated');
      });
  };

  const [load, setLoad] = useState(false);

  // eslint-disable-next-line no-empty-pattern
  const [{ }, executePost] = useRequest(
    {
      url: '/asset/',
      method: 'POST',
    },
    { manual: true },
  );
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePut] = useRequest(
    {
      method: 'PUT',
    },
    { manual: true },
  );

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoad(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(true);
      executePost({
        data: {
          name: info.file.name,
          description: info.file.description,
          mimeType: info.file.originFileObj.type,
          type: info.file.originFileObj.type.split('/')[0],
        },
      })
        .then((res) => {
          const { writeUrl } = res.data;
          const file = info.file.originFileObj;
          executePut({
            url: writeUrl,
            data: file,
            headers: { type: info.file.originFileObj.type },
          })
            .then(() => {
              setLoad(false);
              setUrl(res.data.readUrl);
              detailPatch({
                url: `/user/${data.id}`,
                data: {
                  profilePicture: res.data.id,

                },
              })
                .then(() => {
                  setLoading(false);
                  message.success('Profile Updated Successfully');
                  refetch();
                })
                .catch(() => {
                  setLoading(false);
                  message.error('Profile Not Updated');
                });
            })
            .catch(() => {
              setLoading(false);
              setLoad(false);
            });
        });
    }
  };
  const uploadButton = (
    <div>
      {load ? <LoadingOutlined /> : <Avatar size={130} icon={<UserAddOutlined />} />}
    </div>
  );
  const image = (
    <div>
      {loading ? <LoadingOutlined />
        : (
          <div style={{
            backgroundImage: `url(${url})`,
            width: '130px',
            height: '130px',
            backgroundSize: 'cover',
            borderRadius: '50%',
          }}
          />
        )}
    </div>
  );
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Basic Information"
        className={styles.card_container}
        bordered={false}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className={styles.profile}
          showUploadList={false}
          action="http://localhost:8000/admin/profile"
          onChange={handleChange}
        >
          {url
            ? image : uploadButton}
        </Upload>
        <Form
          form={dataForm}
          name="validate"
          {...formItemLayout}
          onFinish={SubmitDetails}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name!!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter Last name!!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Mobile Number"
          >
            <Input />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={detailsLoading}
            >
              Update
            </Button>
          </div>
        </Form>
      </Card>

      <Card title="Change Password" className={styles.card_container1} bordered={false}>

        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={changePassword}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter Current Password!!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: 'Please enter New Password!!' }, ({ getFieldValue }) => ({
              validator(_, value) {
                const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
                if (!value.match(paswd)) {
                  return Promise.reject(new Error('password between 6 to 12 characters which contain at least one letter, one numeric digit, and one special character'));
                }
                if (getFieldValue('currentPassword') === value) {
                  return Promise.reject(new Error('Password should be different from current passowrd'));
                }
                return Promise.resolve();
              },
            })]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[{ required: true, message: 'Please enter Confirm Password!!' }, ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            })]}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={passwordLoading}
            >
              Change
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
export default Profile;
