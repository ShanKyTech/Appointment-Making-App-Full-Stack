const db = require("../models");
const moment = require("moment");
const AppointmentStatus = db.appointmentStatus;
const Appointment = db.appointment;
const User = db.user;

exports.appointments = async (req, res) => {
  try {
    let appointments = [];
    if ((req.query.status === "view-all") | (req.query.status == "undefined")) {
      appointments = await Appointment.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          { model: User, required: true },
          { model: AppointmentStatus, required: true },
        ],
      });
    } else if (req.query.status === "active") {
      appointments = await Appointment.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          { model: User, required: true },
          {
            model: AppointmentStatus,
            required: true,
            where: {
              status: "active",
            },
          },
        ],
      });
    } else if (req.query.status === "Inactive") {
      appointments = await Appointment.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          { model: User, required: true },
          {
            model: AppointmentStatus,
            required: true,
            where: {
              status: "Inactive",
            },
          },
        ],
      });
    } else if (req.query.status === "cancel") {
      appointments = await Appointment.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          { model: User, required: true },
          {
            model: AppointmentStatus,
            required: true,
            where: {
              status: "cancel",
            },
          },
        ],
      });
    } else {
      res.status(404);
    }
    inactiveAppointment(appointments);
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
      details: req.body.details,
      userId: req.userId,
    });
    await appointment.save();

    const status = await AppointmentStatus.build({
      status: "active",
      appointmentId: appointment.id,
    });
    await status.save();

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
      include: [{ model: User, required: true }],
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
exports.update = async (req, res) => {
  try {
    const appointment = await Appointment.update(
      {
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        details: req.body.details,
        userId: req.userId,
      },
      { where: { id: req.body.id } }
    );
    if (!appointment) {
      return res.status(200).send({
        status: 404,
        message: "No data found",
      });
    }
    const appointments = await Appointment.findAll({
      where: { id: req.body.id },
    });
    inactiveAppointment(appointments);
    res.status(200).send({
      status: 200,
      message: "Data Update Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * active  appointment
 * @param id
 */
exports.active = async (req, res) => {
  try {
    const id = req.params.id;
    await AppointmentStatus.update(
      {
        status: "active",
      },
      {
        where: { appointmentId: id },
      }
    );

    res.status(200).send({
      status: 200,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * active  appointment
 * @param id
 */
exports.cancel = async (req, res) => {
  try {
    const id = req.params.id;
    await AppointmentStatus.update(
      {
        status: "cancel",
      },
      {
        where: { appointmentId: id },
      }
    );
    res.status(200).send({
      status: 200,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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
      message: "Appointment Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const inactiveAppointment = async (appointments) => {
  appointments.forEach(async (val) => {
    const date = val.date;
    const time = val.time;
    const now = new Date();
    const dbdateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss");
    const current = moment(now, "YYYY-MM-DD");
    if (current > dbdateTime) {
      await AppointmentStatus.update(
        {
          status: "Inactive",
        },
        {
          where: { appointmentId: val.id },
        }
      );
    } else {
      const appointStatus = await AppointmentStatus.findOne({
        where: {
          appointmentId: val.id,
        },
      });

      await AppointmentStatus.update(
        {
          status:
            appointStatus.status == "Inactive"
              ? "active"
              : appointStatus.status,
        },
        {
          where: { appointmentId: val.id },
        }
      );
    }
  });
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
};
