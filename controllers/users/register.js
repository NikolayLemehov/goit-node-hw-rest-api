const {Model: User} = require('../../models').users;
const createError = require("http-errors");
const bcrypt = require('bcrypt');

const register = async (req, res) => {

  const {email, password, subscription} = req.body;
  const existedUser = await User.findOne({email});
  if (existedUser) throw createError(409, `Email in use`);

  const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const user = await User.create({email, password: hashPassword, subscription});

  res
    .status(201)
    .json({
      data: {email},
      message: `User by id: ${user._id} has been created`,
    });
};

module.exports = register;
