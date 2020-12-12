const { authJwt } = require("../middleware");
const controller = require("../controllers/userController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/users/upload/image", [authJwt.verifyToken], controller.upload);
  app.get("/api/users/image/:id", [authJwt.verifyToken], controller.getAvatar);
};
