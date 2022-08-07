module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "prettier",
    "import",
    "unused-imports",
    "@typescript-eslint",
    "cypress",
  ],
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    node: true, // for module.export
  },
  rules: {
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error",
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        bracketSpacing: true,
        endOfLine: "auto",
        printWidth: 100,
        tabWidth: 4,
        arrowFunctionParentheses: "always",
      },
    ],
    "eol-last": ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
      },
    ],
    "no-console": ["error", { allow: ["log", "warn", "error"] }],
    "import/order": [
      "error",
      {
        "newlines-between": "never",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-var-requires": 0,
    "react/no-array-index-key": 0,
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-explicit-any": "off",
    "no-empty-function": "off",
  },
};
