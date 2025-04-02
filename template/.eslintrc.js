module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["@typescript-eslint", "react", "react-native", "prettier"],
  ignorePatterns: ["/dist/*"],
  rules: {
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".ts", ".tsx"],
      },
    ],
    "@typescript-eslint/no-use-before-define": ["warn"],
    "import/extensions": 0,
    "react/prop-types": 0,
    "no-shadow": "off",
    camelcase: 0,
    "react-hooks/exhaustive-deps": ["warn"],
    "import/no-extraneous-dependencies": 0,
    "react-native/no-raw-text": 0,
    "react/jsx-props-no-spreading": 0,
    "linebreak-style": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-ts-comment": 0,
    "react/no-unused-prop-types": 0,
    "@typescript-eslint/no-shadow": ["error"],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        endOfLine: "auto",
      },
    ],
    "react-native/sort-styles": 0,
  },
};
