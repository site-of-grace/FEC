import '@testing-library/jest-dom/extend-expect';

// This is optional but recommended configuration for faster test runs.
jest.mock('debounce', () => (fn) => fn);

// Set up global variables used by tests.
global.localStorage = {};

// Ignore certain file types when running tests.
module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
};