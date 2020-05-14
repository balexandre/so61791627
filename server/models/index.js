// DATABASE FILE
// ============================================================
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const _ = require('lodash');

const db = {};

// CONNECTION
// ============================================================
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PWD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: process.env.APP_ENVIRONMENT !== 'local' ? null : console.log, // eslint-disable-line no-console
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  }
});

// CAN CONNECT?
// ============================================================
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
  });

// BIND MODELS FROM FILES
// ============================================================
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// BIND ASSOCIATIONS
// ============================================================
Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

// EXPORT
// ============================================================
module.exports = _.extend(
  {
    sequelize,
    Sequelize,
  },
  db
);
