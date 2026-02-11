const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const storage = process.env.DB_STORAGE || path.join(__dirname, '..', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false,
});

const User = require('./user')(sequelize);
const Videojuego = require('./videojuego')(sequelize);

// Associations
User.hasMany(Videojuego, { foreignKey: 'userId', as: 'videojuegos' });
Videojuego.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = { sequelize, User, Videojuego };
