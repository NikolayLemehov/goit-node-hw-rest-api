const CreateError = require('http-errors');

const {Model: User} = require('../../models').users;

const verifyEmail = async (req, res) => {
  const {verificationToken} = req.params;
  const user = await User.findOne({verificationToken});
  if (!user) throw CreateError(404, 'User not found');
  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});
  res.json({
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
