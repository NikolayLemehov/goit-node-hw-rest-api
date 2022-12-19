const jwt = require('jsonwebtoken');
const {Model: User} = require('../../models').users;
const createError = require("http-errors");
const bcrypt = require('bcrypt');

const {SECRET_KEY} = process.env;

const login = async (req, res) => {

  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) throw createError(401, `Email or password is wrong`);

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) throw createError(401, `Email or password is wrong`);


  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
  res
    .status(200)
    .json({
      data: {email, token},
      message: `User by id: ${user._id} has been authorized`,
    });
};

module.exports = login;
