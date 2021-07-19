module.exports = {
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  // Trailing commas help with git merging and conflict resolution
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  arrowParens: avoid,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: '.editorconfig',
      options: {
        parser: 'yaml',
      },
    },
  ],
};
