import axios, { Axios } from "axios";
const db=require("../../db/models/index");

export const renderData=async (req,res)=>{
    const data = await db.Page.findAll();
    res.status(200).json({ data : data });
};

export const postData=async (req,res)=>{
    let data_id=null;
    await axios.get('http://localhost:8000/api/page').then( res => {
        console.log(res.data);
        data_id = res.data.data[0].id;
    });
    let code = req.body;
    let UpdatedCode = JSON.stringify(code);
    const result = await db.Page.update( { data: UpdatedCode } ,{ where: { id: data_id } });
    res.status(201).json({ result });
};