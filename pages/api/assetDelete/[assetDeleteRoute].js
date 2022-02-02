import db from "../../../db/models";

const handler = async (req, res) => {
  const body=req.body;

    // const jane = await db.Asset.findAll();
    const jane = db.Asset.destroy({
        where: {
          id: body.id
        }
      });

    res.status(200).json({ name: jane });
};

export default handler;

