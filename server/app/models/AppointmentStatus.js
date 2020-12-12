module.exports = (sequelize, Sequelize) => {
  const AppointmentStatus = sequelize.define("appointment_statuses", {
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return AppointmentStatus;
};
