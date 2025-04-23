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
    "no-console": "off", // Allow console statements

    "no-underscore-dangle": [
      "error",
      {
        allow: ["_id"], // Only allow '_id'
      },
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "next", // Ignore unused 'next' arguments in middleware
      },
    ],
  },
};