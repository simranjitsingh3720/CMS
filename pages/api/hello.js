// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../db/models";

const handler = async (req, res) => {
  // const jane = await db.Schema.create({
  //   slug: "articles",
  //   schema: { name: "mohit" },
  //   published_by: "a0b1fdb2-1c43-4408-a643-c7f454589ce4",
  //   created_by: "a0b1fdb2-1c43-4408-a643-c7f454589ce4",
  //   updated_by: "a0b1fdb2-1c43-4408-a643-c7f454589ce4",
  //   deleted_by: "a0b1fdb2-1c43-4408-a643-c7f454589ce4",
  // });

  const jane = await db.Schema.findAll();
  const users = await db.User.findAll({
    where: {
      id: jane[0].created_by,
    },
  });
  res.status(200).json({ name: users });
};

export default handler;
