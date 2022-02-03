const db=require("../../db/models/index");

export const listContents=async (req,res)=>{

    const slug=req.query;
    const contents=await db.Content.findAll({ where:{
        schemaId:slug
    } });

    return res.status(200).json({ data: contents });
};


export const addContent=async (req,res)=>{
    
    const body=req.body;
    const data=await db.Content.create({
        ...body
    });
    return res.status(200).json({ name: data });
};