const db = require("../models");

const Appointment = db.appointment;
const User = db.user;

exports.appointments = async (req, res) => {
  try {
    let appointments = await Appointment.findAll({
      where: {
        userId: req.userId,
      },
      include: [{ model: User, required: true }],
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * create new appointment
 */
exports.create = async (req, res) => {
  try {
    const appointment = await Appointment.build({
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      userId: req.userId,
    });
    await appointment.save();
    if (!appointment) {
      return res.status(200).send({
        status: 404,
        message: "No data found",
      });
    }
    res.status(200).send({
      status: 200,
      message: "Data Save Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * view appointment
 * @param id
 */
exports.view = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!appointment) {
      return res.status(404).json({
        message: "No data found",
      });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * update appointment
 * @param id
 */
exports.update = (req, res) => {

  const id = req.params.id;
  console.log(id)

  Appoinment.update(req.body, {
      where: { id: id }
  })
      .then(appoinment => {
          if (!appoinment) {
              res.status(404).send("Data not found!");
          } else {
              appoinment.name
          }

      })
      .catch(err => {
          res.status(500).send({
              message: "Error updating Tutorial with id=" + id
          });
      });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * delete appointment
 * @param id
 */
exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.destroy({
      where: { id: id },
    });
    if (!appointment) {
      return res.status(200).send({
        status: 404,
        message: "No data found",
      });
    }
    res.status(200).send({
      status: 200,
      message: "Data Delete Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
