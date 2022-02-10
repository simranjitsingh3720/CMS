import axios from 'axios';
import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AssetCard from './AssetCard';
import AssetForm from './AssetForm';
import Styles from './style.module.scss';
import ActionBar from '../../components/ActionBar';

function PageAsset() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // make api call according to searchvalue

  }, [searchValue]);

  const showDrawer = () => {
    setVisible(true);
  };

  // action bar

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
    },
    buttons: [{
      name: 'Add Asset',
      icon: <PlusOutlined />,
      onClick: showDrawer,
    },

    ],
  };

  const onClose = () => {
    setVisible(false);
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
      <ActionBar actions={actions} />

      <div>
        <div>
          <div className={Styles.article_body_header}>
            <Drawer title="Upload Form" placement="right" onClose={onClose} visible={visible}>
              <AssetForm />
            </Drawer>
            <div />
          </div>
          <div className={Styles.article_list}>
            {
              flag ? (
                <>
                  {data.map((e) => <AssetCard key={e.id} data={e} />)}
                </>
              ) : <h1>No asset found....</h1>
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default PageAsset;
