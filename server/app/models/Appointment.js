module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointments", {
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: true,
    },
    details: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });

  return Appointment;
};
