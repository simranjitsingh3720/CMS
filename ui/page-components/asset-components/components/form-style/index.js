
import React, { useState } from 'react';
import Axios from 'axios';

const UploadForm = () => {

    const styleset={display: 'flex',flexDirection: 'column',width: "300px",margin: "100px auto"};
    const [colorchange,setChange]=useState({})
    const [file,setFile]=useState();
    const [name,setName]=useState("select file")
    const [url,setUrl]=useState("");
     

    const uploadFile=(e)=>{
        e.preventDefault();
        Axios.get("http://127.0.0.1:8000/api/asset/get-signed-url")
        .then(res => {
            const objecturl=res.data.split('?')[0];
            // console.log('upload file', file)
            Axios.put(res.data, file, {
                headers: {
                    "Content-Type": file.type
                },
              })
            .then(()=>{
                Axios.post("http://localhost:8000/api/asset",{url:objecturl,description:" ",name:name})
                .then((res)=>{console.log(res)})
                .catch((e)=>console.log(e))
            })
            .catch((e)=>console.log("error", e))

        })
    }

    const handleInput=(e)=>{
        setFile(e.target.files[0]);
        setChange({backgroundImage: "linear-gradient(rgb(150, 158, 10), rgb(160, 105, 21))"});
        if(e.target.files[0].name.length<=20)
        setName(e.target.files[0].name);
        else {
            let s=e.target.files[0].name.length
            setName(e.target.files[0].name.substr(0,10)+"..."+e.target.files[0].name.substr(s-7,7));
        }

    }
    // console.log({file})
    
    return (
        <form id="imageForm" style={styleset} onSubmit={uploadFile}>
            <div className="button-green" style={colorchange}><input className="file-upload" type="file" onChange={(e)=>handleInput(e)}/>{name}</div>
                <button type="submit" className='file-button'>Upload</button>

        </form>
    );
}


export default UploadForm;