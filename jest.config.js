const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(pdfjs-dist)/)"],
};

module.exports = createJestConfig(config);
