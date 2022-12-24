const {Model: User} = require('../../models').users;
const createError = require("http-errors");
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const register = async (req, res) => {

  const {email, password, subscription} = req.body;
  const existedUser = await User.findOne({email});
  if (existedUser) throw createError(409, `Email in use`);

  const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  const avatarURL = gravatar.url(email);
  const user = await User.create({email, password: hashPassword, avatarURL, subscription});

  res
    .status(201)
    .json({
      data: {
        id: user._id,
        email: user.email,
        avatarURL: user.avatarURL,
        subscription: user.subscription,
      },
      message: `User by id: ${user._id} has been created`,
    });
};

module.exports = register;
