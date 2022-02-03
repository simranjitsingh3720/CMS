const db = require("../db/models/index");

const listAssets = async (req, res) => {
    const assets = await db.Asset.findAll();
    return res.status(200).json(assets);
}

const createAsset = async (req, res) => {
    const { body } = req;
    const asset = await db.Asset.create(body);
    return res.status(201).json({ id: asset.id });
}

const findAsset = async (req,res)=>{
    const id=req.query.id;

    const asset = await db.Asset.findOne({
        where: {
          id:id
        }, 
      });

      if(asset==null){
          res.send('no asset found');
      }
      else{
        res.status(200).json({ asset });
      } 
}

const deleteAsset = async (req,res)=>{
    const id=req.query.id;

    await db.Asset.destroy(
        { where: { id: id} }		
      )
   
    res.status(204).json(console.log('successfully deleted'));
}

const updateAsset =async(req,res)=>{
    const id=req.query.id
    const data=req.body

    const updatedAsset = await db.Asset.update(
        data,	
        { where: { id: id} }		
      )

    res.status(200).json(updatedAsset );
}

module.exports = {
    listAssets,
    createAsset,
    findAsset,
    deleteAsset,
    updateAsset
}
