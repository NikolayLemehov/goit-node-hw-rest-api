const createError = require("http-errors");
const contactsModel = require("../../services/contacts");

const getById = async (req, res) => {
  const {contactId} = req.params;
  const contact = await contactsModel.getById(contactId)
    .catch(() => {
      throw createError(404, `Contact by id: ${contactId} hasn't been found`);
    });


  res
    .status(200)
    .json({
      data: {contact},
      message: `Contact by id: ${contactId} has been deleted`,
    });
};

module.exports = getById;