/* eslint-disable no-console */

// LOGGER FILE
// ============================================================
const log = (message, ...args) => {
  if (args && args.length > 0) {
    console.log(message, args);
  } else {
    console.log(message);
  }
};

const logError = (err) => {
  console.log(err.message, err.stack);
};

exports.log = log;
exports.error = logError;
