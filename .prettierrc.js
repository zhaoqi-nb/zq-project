module.exports = {
  singleQuote: true,
  semi: true,
  // Trailing commas help with git merging and conflict resolution
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
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
