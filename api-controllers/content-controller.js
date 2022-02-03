const db = require("../db/models/index");

const getContent = async (req,res)=>{
    const { slug,dataId }=req.query;
    const content = await db.Content.findOne({
        where:{
            schemaId : slug,
            id : dataId
        }
    });
    return res.status(200).json({ data : content });
};


const listContents = async (req,res)=>{

    const { slug }=req.query;

    if(slug){
        const contents=await db.Content.findAll({ where : { schemaId:slug } });
        return res.status(200).json({ data : contents });
    }
    return res.status(400).json({ error : "invalid request" });
};

const addContent = async (req,res)=>{
    
    const body=req.body;
    const { slug }=req.query;

    const data=await db.Content.create({
        ...body,
        schemaId:slug
    });

    return res.status(201).json({ dataId : data.id });
};

const updateContent = async (req,res)=>{
    const body =req.body;
    const { slug,dataId }=req.query;

   const updatedContent= await db.Content.update({ ...body },{
        where:{
            schemaId:slug,
            id:dataId
        }
    });

    return res.status(200).json({ data : updatedContent });
};

const deleteContent=async (req,res)=>{

    const { slug,dataId }=req.query;
    const content = await db.Content.destroy({
        where:{
            schemaId:slug,
            id:dataId
        }
    });
    return res.status(200).json({ data: content });
};

module.exports={
    getContent,
    listContents,
    addContent,
    updateContent,
    deleteContent
};