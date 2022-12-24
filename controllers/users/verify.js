const CreateError = require('http-errors');
const nanoid = require("nanoid");
const {sendEmail} = require("../../helpers");
const {Model: User} = require('../../models').users;

const verify = async (req, res) => {
  const {email} = req.body;
  const user = await User.findOne({email});
  if (!user) throw CreateError(404, 'Not found email');
  if (user.verify) throw CreateError(400, 'Verification has already been passed');

  const verificationToken = nanoid();
  await User.findByIdAndUpdate(user._id, {
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: 'Approve email again',
    html: `<a
            href="${process.env.LOCATION}/api/users/verify/${verificationToken}"
            target="_blank"
        >Push down for approve email</a>`,
  };
  await sendEmail(verifyEmail);
  
  res.status(200).json({
    message: 'Verification email sent',
  });
};

module.exports = verify;
