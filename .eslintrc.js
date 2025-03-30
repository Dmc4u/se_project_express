module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    camelcase: ["error", { allow: ["_id"] }],
    "no-console": ["warn", { allow: ["error"] }],
    "no-underscore-dangle": ["error", {
      allow: ["_id", "__filename", "__dirname"], // Allow common Node.js globals
      allowAfterThis: true, // Allow this._property in classes
      allowAfterSuper: true, // Allow super._property in class inheritance
      allowAfterThisConstructor: true, // Allow usage in constructors
    }]
  },
};

// This configuration file sets up ESLint with the following features:
// - Environment: Node.js
// - Extends recommended ESLint rules and Airbnb's base style guide
// - Uses ECMAScript 2021 syntax
// - Allows the use of ES modules
// - Customizes rules for camelCase and underscores
// - Allows the use of _id, __filename, and __dirname in certain contexts
// - Allows the use of this._property and super._property in classes
// - Allows the use of _property in constructors
// - Uses Prettier for code formatting
// - Allows the use of underscores in variable names
// - Allows the use of underscores in class properties
// - Allows the use of underscores in class inheritance