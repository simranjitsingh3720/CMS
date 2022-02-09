import axios from 'axios';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import CardStyle from './components/card-style';
import UploadForm from './components/form-style';
// import './style.css'

function Asset() {
  const [data, setData] = useState([]);
  const [set1, setSet1] = useState();
  const [set2, setSet2] = useState({ display: 'none' });
  const [searchData, setSearchData] = useState('');
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    // let data=[];
    axios.get('http://localhost:8000/api/asset')
      .then((res) => {
        // data=res.data;
        setData(res.data.list);
        // console.log(res.data.list);
      })
      .catch((e) => console.log(e));
  }, []);

  const assetClick = () => {
    setSet1({ display: 'none' });
    setSet2({});
  };

  const formClick = () => {
    setSet2({ display: 'none' });
    setSet1({});
  };
  const FindByName = () => {
    if (searchData === '') {
      axios.get('http://localhost:8000/api/asset')
        .then((res) => {
          setFlag(true);
          setData(res.data);
        });
    } else {
      axios.get(`http://localhost:8000/api/asset/findByName/${searchData}`)
        .then((res) => {
          if (res.data.asset.length > 0) {
            setFlag(true);
            setData(res.data.asset);
          } else setFlag(false);
        });
    }
  };

  return (
    <div style={{ backgroundColor: '#EFEFEF' }}>
      <div className="header" />
      <div className="article">
        <div className="sidebar" />
        <div className="article-body" style={set1}>
          <div className="article-body-header">
            <button onClick={assetClick} className="button1">Add Asset</button>
            <div>
              <input type="text" placeholder="search" onChange={(e) => setSearchData(e.target.value)} />
              <button className="button2" onClick={FindByName}><SearchOutlined /></button>
            </div>
          </div>
          {
          flag ? (
            <>
              {
            data.map((e, i) => <CardStyle key={i} data1={e} />)
          }
            </>
          ) : <h1>No asset found</h1>
}
        </div>
        <div className="article-body-form" style={set2}>
          <UploadForm />
          <button className="form-button" onClick={formClick}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Asset;
