import db from "../../../db/models";

const handler = async (req, res) => {
    const jane = await db.Asset.findAll();

    res.status(200).json({ name: jane });
};

export default handler;

