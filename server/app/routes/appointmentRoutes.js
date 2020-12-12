const { authJwt } = require("../middleware");
const controller = require("../controllers/appointmentController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/appointments", [authJwt.verifyToken], controller.appointments);
  app.post(
    "/api/appointments/create",
    [authJwt.verifyToken],
    controller.create
  );
  app.get("/api/appointments/view/:id", [authJwt.verifyToken], controller.view);
  app.put("/api/appointments/update", [authJwt.verifyToken], controller.update);
  app.get(
    "/api/appointments/active/:id",
    [authJwt.verifyToken],
    controller.active
  );
  app.get(
    "/api/appointments/cancel/:id",
    [authJwt.verifyToken],
    controller.cancel
  );
  app.delete(
    "/api/appointments/destroy/:id",
    [authJwt.verifyToken],
    controller.destroy
  );
};
