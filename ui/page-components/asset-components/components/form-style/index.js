import React, { useState } from 'react';
import Axios from 'axios';

function UploadForm() {
  const styleset = {
    display: 'flex', flexDirection: 'column', width: '300px', margin: '100px auto',
  };
  const [colorchange, setChange] = useState({});
  const [file, setFile] = useState(null);
  const [name, setName] = useState('select file');
  const [filename, setFilename] = useState('');
  const [desc, setDesc] = useState('');

  const SubmitDetails = (e) => {
    e.preventDefault();
    // sending user given data to table expect the url
    if (file && name) {
      Axios.post('http://localhost:8000/api/asset', {
        name: filename, description: desc, mime_type: file.type, type: file.type.split('/')[0],
      })
        .then((res) => {
          Axios.put(res.data.writeUrl, file, { headers: { type: file.type } })
            .then((re) => { console.log(re); });
        });
    } else {
      alert('please fill all details');
    }
  };

  const handleInput = (e) => {
    setFile(e.target.files[0]);
    setChange({ backgroundImage: 'linear-gradient(rgb(150, 158, 10), rgb(160, 105, 21))' });
    if (e.target.files[0].name.length <= 20) setName(e.target.files[0].name);
    else {
      const s = e.target.files[0].name.length;
      setName(`${e.target.files[0].name.substr(0, 10)}...${e.target.files[0].name.substr(s - 7, 7)}`);
    }
  };

  return (
    <form id="imageForm" style={styleset} onSubmit={SubmitDetails}>
      <input type="text" className="input-box" value={filename} placeholder="name" onChange={(e) => setFilename(e.target.value)} />
      <input type="search" className="input-box" value={desc} placeholder="description" onChange={(e) => setDesc(e.target.value)} />
      <div className="button-green" style={colorchange}>
        <input className="file-upload" type="file" onChange={(e) => handleInput(e)} />
        {name}
      </div>
      <button type="submit" className="file-button">Submit</button>

    </form>
  );
}

export default UploadForm;
