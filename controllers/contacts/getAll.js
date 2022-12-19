const contactsModel = require("../../services/contacts");

const getAll = async (req, res) => {
  const page = +(req.query.page ?? '1');
  const limit = +(req.query.limit ?? '6');
  const favorite = req.query.favorite === 'true';

  const {_id} = req.user;

  const contacts = await contactsModel.getAll(_id, page, limit, favorite);

  res
    .status(200)
    .json({
      data: {contacts, page, limit},
    });
};

module.exports = getAll;