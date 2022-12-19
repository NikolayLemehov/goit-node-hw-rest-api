const express = require('express');
const ctrl = require('../../controllers/users');
const {validation, ctrlWrapper, auth} = require('../../middlewares');
const {users} = require('../../models');

const router = express.Router();

router.post('/register', validation(users.registerJoiSchema), ctrlWrapper(ctrl.register));

router.get('/login', validation(users.loginJoiSchema), ctrlWrapper(ctrl.login));

router.get('/current', ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

module.exports = router;
