const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const delById = require('./delById');
const updateById = require('./updateById');
const patchFavoriteById = require('./patchFavoriteById');

module.exports = {
  getAll,
  getById,
  add,
  delById,
  updateById,
  patchFavoriteById,
};
