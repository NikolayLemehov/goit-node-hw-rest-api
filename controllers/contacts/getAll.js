const contactsModel = require("../../services/contacts");

const getAll = async (req, res) => {
  const {page, limit} = req.query;
  const {_id} = req.user;
  const contacts = await contactsModel.getAll(_id, Number(page), Number(limit));

  res
    .status(200)
    .json({
      data: {contacts},
    });
};

module.exports = getAll;