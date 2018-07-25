module.exports = {
  testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
