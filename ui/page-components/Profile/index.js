import {
  Card, Form, Input, Button, message, Upload, Avatar, Switch,
} from 'antd';
import { LoadingOutlined, UserAddOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from 'react';
import { useRequest } from '../../helpers/request-helper';
import styles from './style.module.scss';
import SessionContext from '../../context/SessionContext';

function Profile() {
  const [form] = Form.useForm();
  const [dataForm] = Form.useForm();
  const { refetch: sessionRefetch } = useContext(SessionContext);

  const [data, setData] = useState({});
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonFlag, setButtonFlag] = useState(true);

  const [{ }, handleGet, refetch] = useRequest({
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
        if (res.data.user.ProfilePicture) { setUrl(res.data.user.ProfilePicture.url); }
      })
      .catch((err) => {
        message.error(err.response.data.message || err.response.data.messages[0]);
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
    let submitData = {};
    if (values.switch) {
      submitData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        flag: {
          asset: true,
          page_manager: true,
          datastore: true,
          datastore_contents: true,
          datastore_structure: true,
        },
      };
    } else {
      submitData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      };
    }

    detailPatch({
      url: `/user/${data.id}`,
      data: submitData,
    })
      .then(() => {
        message.success('User Updated');
        refetch();
        sessionRefetch();
      })
      .catch((err) => {
        message.error(err.response.data.message || err.response.data.messages[0]);
      });

    setButtonFlag(true);
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
        message.success('updated successfully');
        sessionRefetch();
      })
      .catch((err) => {
        form.resetFields();
        message.error(err.response.data.message || err.response.data.messages[0]);
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
                  sessionRefetch();
                  refetch();
                })
                .catch((err) => {
                  setLoading(false);
                  message.error(err.response.data.message || err.response.data.messages[0]);
                });
            })
            .catch((err) => {
              setLoading(false);
              setLoad(false);
              message.error(err.response.data.message || err.response.data.messages[0]);
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
            backgroundPosition: 'center',
            borderRadius: '50%',
          }}
          />
        )}
    </div>
  );

  const check = () => {
    setButtonFlag(false);
  };

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
          accept="image/*"
          action="/admin/profile"
          onChange={handleChange}
        >
          {url
            ? image : uploadButton}
        </Upload>
        <Form
          form={dataForm}
          name="validate"
          layout="vertical"
          style={{ margin: '10px' }}
          onFinish={SubmitDetails}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name!!' }]}
          >
            <Input onChange={check} />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter Last name!!' }]}
          >
            <Input onChange={check} />
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
            <Input onChange={check} />
          </Form.Item>
          <Form.Item name="switch" label="Enable Tutorial" valuePropName="checked">
            <Switch onChange={check} />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={detailsLoading}
              disabled={buttonFlag}
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
          layout="vertical"
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
            rules={[
              { required: true, message: 'Please enter New Password!!' },
              {
                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/,
                message: 'password between 6 to 12 characters which contain at least one letter, one numeric digit, and one special character',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('currentPassword') === value) {
                    return Promise.reject(new Error('Password should be different from current password'));
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
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={passwordLoading}
              >
                Change
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
export default Profile;
