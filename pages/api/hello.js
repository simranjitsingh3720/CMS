<<<<<<< HEAD
// import db from '../../db/models';

const handler = async (req, res) => {
  // const jane = await db.User.create({
  //   email:"mohit271232@gmail.com",
  //   password:"9934408804@",
  //   firstName:"Rohit",
  //   lastName:"Singh"
  // });

  // const jane = await db.Schema.create({
  //   slug: "articles",
  //   schema: { name: "Mohit" },
  //   createdBy: "775db353-6c2c-4a31-a080-9e54b9a6e789",
  // });

  // const jane = await db.Content.create({
  //   schemaId:"e04a9d96-e52a-4b94-83e4-059fa487ef80",
  //   data:{ "name":"mohit" },
  //   status:"draft"
  // });

  // const jane = await db.Schema.findAll();
  // const users = await db.User.findAll({
  //   where: {
  //     id: jane[1].createdBy,
  //   },
  // });
  res.status(200).json({ name: 'hi' });
=======
const handler = async (req, res) => {
  res.status(200).json({ name: 'HELLO' });
>>>>>>> 3dadd087843284cbb5e88571c979c1c68d49579e
};

export default handler;
