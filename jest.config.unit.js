const mainConfig = require('./jest.config.js');

module.exports = {
  ...mainConfig,
  testMatch: ["**/tests/**/*.unit.test.(ts|js)"],
};
