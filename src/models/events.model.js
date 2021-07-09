// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const events = sequelizeClient.define('events', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  events.associate = (models) => {
    events.belongsTo(models.users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    events.belongsToMany(models.users, {
      through: models.user_events,
      foreignKey: 'eventId'
    });
  }

  return events;
};
