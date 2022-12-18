const contactsModel = require("../../services/contacts");
const createError = require("http-errors");

const add = async (req, res) => {
  const {name, email, phone} = req.body;

  const existedContact = await contactsModel.findByEmail(email);
  if (existedContact) throw createError(400, `Email: ${email} has been existed`);

  const contact = await contactsModel.add({name, email, phone});

  res
    .status(201)
    .json({
      data: {contact},
      message: `Contact by id: ${contact.id} has been added`,
    });
};

module.exports = add;
