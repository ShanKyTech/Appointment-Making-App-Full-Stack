module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointments", {
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: true,
    },
  });

  return Appointment;
};
