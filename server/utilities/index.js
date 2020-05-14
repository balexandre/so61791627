// BASE UTILITIES FILE
// ============================================================
// will create a path from all ".js" files in this directory

const fs = require('fs');

const services = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js' && file.split('.')[1] === 'js') {
    const name = file.substr(0, file.indexOf('.'));
    services[name] = require(`./${name}`); // eslint-disable-line global-require, import/no-dynamic-require
  }
});

module.exports = services;
