const { getContent,updateContent,deleteContent }= require("../../../../api-controllers/content-controller");

const contentHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getContent(req,res);

        case "PATCH":
            return updateContent(req,res);
        
        case "DELETE":
            return deleteContent(req,res);
    }
};

export default contentHandler;