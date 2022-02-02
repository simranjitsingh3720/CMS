import db from "../../db/models";

const handler = async (req, res) => {
  // const jane = await db.Schema.create({
  //   slug: "articles",
  //   schema: { name: "Rahul" },
  //   createdBy: "dad6dcf0-3549-45c9-8f00-f45ce032d8f2",
  // });

  // const jane = await db.User.create({
  //   email:"ankit@gmail.com",
  //   firstName:'Ankit',
  //   lastName:'Kaushal',
  //   password:"password",
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
