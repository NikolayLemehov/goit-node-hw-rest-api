const {Model: User} = require('../../models').users;

const updateSubscription = async (req, res) => {
  const {_id} = req.user;
  const {subscription} = req.body;
  const user = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
  res.status(200).json({
    message: `Subscription has been changed to ${user.subscription}`,
    data: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = updateSubscription;
