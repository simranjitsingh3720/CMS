import db from "../../db/models";

const handler = async (req, res) => {

  
  const jane = await db.User.create({
    
    email:"adityapilla@gmail.com",
    password:"qwwsggwwjp",
    firstName:"aditya",
    lastName:"pilla"

  });

  res.status(200).json({ name: jane });}


export default handler;
