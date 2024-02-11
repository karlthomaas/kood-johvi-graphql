module.exports = {
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["unicorn"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": [
      "error",
      {
        args: "after-used",
        caughtErrors: "none",
        ignoreRestSiblings: true,
        vars: "all",
      },
    ],
    "prefer-const": "error",
    "react-hooks/exhaustive-deps": "error",
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
      },
    ],
    "max-len": ["error", { code: 140 }],
  },
};
