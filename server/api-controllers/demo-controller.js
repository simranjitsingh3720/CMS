const db = require('../../db/models');

export const updateUser = async (req, res) => {
  const { userId } = req.query;
  try {
    await db.UserDemoPreference.update({ ...req.body }, { where: { userId } });
    const updatedDemo = await db.UserDemoPreference.findOne({ where: { userId } });
    req.session.demoPreference = updatedDemo;

    return res.status(200).json({ userId });
  } catch (err) {
    return res.status(400).json({ message: 'There was an error updating the user' });
  }
};
