import db from "../../../db/models";

const hand = async (req, res) => {

  const body=req.body;
    const jane = await db.Asset.findAll();
    const users = await db.User.findAll({
        where: {
          id:body.id
        },
      });
      res.status(200).json({ imageUrlOfUser: users });
};

export default hand;