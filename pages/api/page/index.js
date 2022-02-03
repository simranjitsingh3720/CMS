import db from "../../../db/models/index";

const  handler = async (req, res) => {
    if(req.method === 'GET'){
        const data = await db.Page.findAll();
        res.status(200).json({ data : data });
    }
    else if(req.method === 'POST'){
        let code = req.body;
        let UpdatedCode = JSON.stringify(code);
        const postData = {
            name:'Page 18',
            slug:'page_18',
            data:UpdatedCode,
            status:'draft'
        };
        try {
            const result = await db.Page.create(postData);
            // await result.save();
            res.status(201).json({ result });
        }
        catch (err) {
            res.status(500).json({ error: 'failed to load data' });
        }

        // console.log("post");
        // res.status(200).json({ message: "Post" });
    }
    else if(req.method === 'PATCH'){
    //     // let code = req.body;
    //     // let UpdatedCode = JSON.stringify(code);
    //     // const postData = {
    //     //     name:'Page 16',
    //     //     slug:'page_16',
    //     //     data:UpdatedCode,
    //     //     status:'draft'
    //     // };
    //     // try {
    //     //     const result = await db.Page.update(postData);
    //     //     res.status(201).json({ result });
    //     // }
    //     // catch (err) {
    //     //     res.status(500).json({ error: 'failed to load data' });
    //     // }
        console.log("Patch request");
        res.status(200).json({ message: "Patch" });

    }
    
};

export default  handler;