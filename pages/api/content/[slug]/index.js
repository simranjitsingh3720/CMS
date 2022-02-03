const { listContents,addContent }= require("../../../../api-controllers/content-controller");

const contentHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return listContents(req,res);

        case "POST":
            return addContent(req,res);
    }
};

export default contentHandler;