const db = require("../models");
const User = db.user;
const base64Img = require("base64-img");
var fs = require("fs");

exports.upload = async (req, res) => {
  var image = req.body.data;

  const user = await User.findOne({
    where: {
      id: req.body.id,
    },
  });

  fs.exists("./" + user.photo, function (exists) {
    if (exists) {
      fs.unlink("./" + user.photo, function (error) {
        if (error) {
          throw error;
        }
      });
    }
    base64Img.img(image, "./uploads", Date.now(), function (err, filepath) {
      User.update({ photo: filepath }, { where: { id: req.body.id } })
        .then((user) => {
          res
            .status(200)
            .send({ success: true, url: "http://localhost:8080/" + filepath });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    });
  });
};
exports.getAvatar = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  let photo = user ? user.photo : "";
  if (photo) {
    res.status(200).json(photo);
  } else {
    res.status(404);
  }
};
