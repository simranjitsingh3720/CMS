import db from "../../../db/models";

const handler = async (req, res) => {

  const {assetCreate}=req.query;
  const body=req.body;
  console.log(body);
  // const jane = await db.Asset.create({
  //   // slug: "articles",
  //   // schema: { name: "phani" },
  //   url:"dgdfhdjkf",

  //   createdBy: "410be22b-0583-4753-bda3-c3a2e028bd64",
  // });

  const jane = await db.Asset.create({
    url:body.url
    // email:"phanipilla@gmail.com",
    // password:"qwertyuiop",
    // // name:"sfff"
    // firstName:"phani",
    // lastName:"pilla"

  });

  // const jane = await db.Asset.findAll();
  // const users = await db.User.findAll({
  //   where: {
  //     id: jane[0].createdBy,
  //   },
  // });
  res.status(200).json({ name: jane });}


export default handler;
