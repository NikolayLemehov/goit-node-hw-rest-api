const express = require('express');
const ctrl = require('../../controllers/users');
const {validation, ctrlWrapper, auth, upload} = require('../../middlewares');
const {users} = require('../../models');

const router = express.Router();

router.post('/register', validation(users.registerJoiSchema), ctrlWrapper(ctrl.register));

router.get('/login', validation(users.loginJoiSchema), ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.post('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch('/', auth, validation(users.subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

router.patch('/avatars', auth,
  // validation(users.avatarJoiSchema),
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.get('/verify', validation(users.emailJoiSchema), ctrlWrapper(ctrl.verify));

module.exports = router;
