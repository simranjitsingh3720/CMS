import db from "../../db/models";

const handler = async (req, res) => {
  // const jane = await db.Schema.create({
  //   slug: "articles",
  //   schema: { name: "phani" },

  //   createdBy: "410be22b-0583-4753-bda3-c3a2e028bd64",
  // });

  // const jane = await db.User.create({
  //   email:"phanipilla@gmail.com",
  //   password:"qwertyuiop",
  //   // name:"sfff"
  //   firstName:"phani",
  //   lastName:"pilla"

  // });

  const jane = await db.Schema.findAll();
  const users = await db.User.findAll({
    where: {
      id: jane[0].createdBy,
    },
  });
  res.status(200).json({ name: users });
};

export default handler;
