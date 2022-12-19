const {Model: User} = require('../../models').users;

const logout = async (req, res) => {
  console.log('logout', req.user);
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: null});

  res.status(204).json();
};

module.exports = logout;
