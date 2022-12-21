const getCurrent = async (req, res) => {
  const {email, subscription} = req.user;

  res
    .status(200)
    .json({
      data: {email, subscription},
    });
};

module.exports = getCurrent;
