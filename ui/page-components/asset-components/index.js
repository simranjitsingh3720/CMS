import axios from 'axios';
import { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';
import CardStyle from './components/CardStyle';
import FormStyle from './components/FormStyle';

const { Search } = Input;

function Asset() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/asset')
      .then((res) => {
        setData(res.data.list);
      })
      .catch(() => { });
  }, [data]);

  const onSearch = (value) => {
    if (value === '') {
      axios.get('http://localhost:8000/api/asset')
        .then((res) => {
          setFlag(true);
          setData(res.data.list);
        });
    } else {
      axios.get(`http://localhost:8000/api/asset/findByName/${value}`)
        .then((res) => {
          if (res.data.asset.length > 0) {
            setFlag(true);
            setData(res.data.asset);
          } else setFlag(false);
        });
    }
  };

  return (
    <div>
      <div className="article">
        <div className="article-body">
          <div className="article-body-header">
            <Button type="button" onClick={showModal} className="button1">Add Asset</Button>
            <Modal title="Upload Form" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <FormStyle />
            </Modal>
            <div>
              <Search placeholder="input search text" onSearch={onSearch} enterButton />
            </div>
          </div>
          <div className="article-list">
            {
              flag ? (
                <>
                  {' '}
                  {data.map((e) => <CardStyle key={e.id} data={e} />)}
                </>
              ) : <h1>No asset found....</h1>
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default Asset;
