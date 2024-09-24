/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true, // Make sure tsconfig.eslint.json exists if you're using project-based linting
    tsconfigRootDir: __dirname, // Specify the correct root directory for the project
  },
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:prettier/recommended", // Integrate Prettier with ESLint
  ],
  rules: {
    // TypeScript-specific rules
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_", // Ignore unused variables prefixed with '_'
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],

    // Import sorting and organizing
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    // Prettier integration
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto", // Handle different OS line endings
      },
    ],

    // React and Next.js specific rules
    "react/react-in-jsx-scope": "off", // Next.js doesn't require React to be in scope
    "jsx-a11y/anchor-is-valid": "off", // Next.js uses custom Link components
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
      },
    },
  ],
  settings: {
    react: {
      version: "detect", // Automatically detect the react version
    },
  },
};

module.exports = config;
