import db from "../../db/models";

const handler = async (req, res) => {
  const jane = await db.Schema.create({
    slug: "articles",
    schema: { name: "mohit" },
    createdBy: "83b99f21-1fd4-41ee-9616-7642713f7f24",
  });

  // const jane = await db.User.create({
  //   email:"as@gmail.com",
  //   password:"ass",
  //   name:"sfff"
  // });

  // const jane = await db.Schema.findAll();
  // const users = await db.User.findAll({
  //   where: {
  //     id: jane[0].created_by,
  //   },
  // });
  res.status(200).json({ name: jane });
};

export default handler;
