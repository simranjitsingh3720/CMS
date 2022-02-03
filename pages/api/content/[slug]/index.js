const { listContents,addContent }= require("../../../../server/cotrollers/content_cotroller");

const handler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return listContents(req,res);
            
        case "POST":
            return addContent(req,res);
        default:
            // handleError(req,res);
            break;
    }

  res.status(200).json({ name: req.method });
};






export default handler;