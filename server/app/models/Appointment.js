module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointments", {
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    time: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Appointment;
};
