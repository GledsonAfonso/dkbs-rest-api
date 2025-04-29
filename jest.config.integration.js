const mainConfig = require('./jest.config.js');

module.exports = {
  ...mainConfig,
  testMatch: ["**/tests/**/*.integration.test.(ts|js)"],
};
