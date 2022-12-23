const {Model: User} = require('../../models').users;
const path = require('path');
const fs = require('fs/promises');
const jimp = require("jimp");

const publicDir = path.join(__dirname, '../../', 'public');
const avatarDir = path.join(publicDir, 'avatars');

const updateAvatar = async (req, res) => {
  const {_id, avatarURL: oldAvatarURL} = req.user;
  const {path: tempUpload, originalname} = req.file;

  const imageName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, imageName);
  await fs.unlink(path.join(publicDir, oldAvatarURL));

  const img = await jimp.read(tempUpload);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload)
    .catch(async (e) => {
      await fs.unlink(tempUpload);
      throw e;
    });

  const avatarURL = path.join('avatars', imageName);
  const user = await User.findByIdAndUpdate(_id, {avatarURL}, {new: true});

  res.status(200).json({
    message: `Avatar has been changed to ${user.avatarURL}`,
    data: {
      avatar: user.avatarURL,
    },
  });
};

module.exports = updateAvatar;
