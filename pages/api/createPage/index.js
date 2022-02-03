// const db=require("../../db/models/index");

const  handler = async (req, res) => {
        if(req.method === 'POST'){
            const data = req.body;
            console.log(data);
            res.status(200).json({ message : "HELLO" });
        }

    }
export default handler;