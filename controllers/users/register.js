const nanoid = require('nanoid');
const {Model: User} = require('../../models').users;
const createError = require("http-errors");
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const {sendEmail} = require('../../helpers');

const register = async (req, res) => {

  const {email, password, subscription} = req.body;
  const existedUser = await User.findOne({email});
  if (existedUser) throw createError(409, `Email in use`);

  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  const avatarURL = gravatar.url(email);
  const user = await User.create({email, password: hashPassword, avatarURL, subscription, verificationToken});

  const verifyEmail = {
    to: email,
    subject: 'Approve email',
    html: `<a
            href="${process.env.LOCATION}/api/users/verify/${verificationToken}"
            target="_blank"
        >Push down for approve email</a>`,
  };
  await sendEmail(verifyEmail);

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
