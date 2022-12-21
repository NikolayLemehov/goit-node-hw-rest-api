const Contact = require("../models").contact.Model;

const getAll = async (id, page, limit, favorite) => {
  const skip = (page - 1) * limit;
  const filter = {
    owner: id,
    ...(favorite ? {favorite} : {}),
  };

  return Contact
    .find(filter, '', {skip, limit})
    .populate('owner', '_id email subscription');
};

const getById = async (id) => {
  return Contact.findById(id);
};

const add = async ({name, email, phone, owner}) => {
  return Contact.create({name, email, phone, owner});
};

const delById = async (id) => {
  return Contact.findByIdAndRemove({_id: id});
};

const updateById = async (id, fields) => {
  return Contact.findByIdAndUpdate({_id: id}, fields, {new: true});
};

const patchFavoriteById = async (id, fields) => {
  const {favorite} = fields;
  return Contact.findByIdAndUpdate({_id: id}, {favorite}, {new: true});
};

const findByEmail = async email => {
  return Contact.findOne({email});
};

module.exports = {
  getAll,
  getById,
  add,
  delById,
  updateById,
  patchFavoriteById,
  findByEmail,
};
