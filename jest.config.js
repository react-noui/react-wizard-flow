module.exports = {
  preset: '@anansi/jest-preset',
  testEnvironment: 'jsdom',
  modulePaths: ['src'],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.js"],
};
