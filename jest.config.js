module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.(integration|unit).test.(ts|js)"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest", {
        tsconfig: "tsconfig.json",
      },
    ]
  },
};
