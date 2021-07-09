// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
  
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
  
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
      beforeCreate: async (users) => {
        const salt = genSaltSync(10);
        users.password = hashSync(users.password, salt);
      },
      beforeUpdate: async (users) => {
        const salt = genSaltSync(10);
        users.password = hashSync(users.password, salt);
      }
    }
  });

  users.prototype.validatePassword = async function (password) {
    return compareSync(password, this.password);
  }

  users.associate = (models) => {
    users.hasMany(models.events, {
      foreignKey: "userId",
      as: "events"
    });

    users.belongsToMany(models.events, {
      through: models.user_events,
      foreignKey: 'userId'
    });
  }

  return users;
};
