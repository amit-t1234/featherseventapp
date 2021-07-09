// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userEvents = sequelizeClient.define('user_events', {
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  userEvents.associate = (models) => {
    userEvents.belongsTo(models.users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    
    userEvents.belongsTo(models.events, {
      foreignKey: "eventId",
      onDelete: "CASCADE"
    });
  }

  return userEvents;
};
