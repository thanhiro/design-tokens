module.exports = {
  parsers: [
    {
      pattern: /\.json$/,
      parse: ({ filePath, contents }) => {
        return JSON.parse(contents).global;
      },
    },
  ],
  source: ["tokens.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "build/",
      files: [
        {
          destination: "scss/_variables.scss",
          format: "scss/variables",
        },
      ],
    },
    web: {
      transformGroup: "web",
      buildPath: "build/",
      files: [
        {
          destination: "json/_variables.json",
          format: "json/nested",
        },
      ],
    },
  },
};
