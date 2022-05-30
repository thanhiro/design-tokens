module.exports = {
  source: ["tokens.json"],
  transform: {
    lineHeightTransform: {
      type: "value",
      matcher: function (prop) {
        return prop.attributes.category === "lineHeights";
      },
      transformer: function (prop) {
        return `${prop.original.value / 100}rem`;
      },
    },
    spacingTransform: {
      type: "value",
      matcher: function (prop) {
        return prop.attributes.category === "spacing";
      },
      transformer: function (prop) {
        return `${prop.original.value / 16}rem`;
      },
    },
  },
  parsers: [
    {
      pattern: /\.json$/,
      parse: ({ filePath, contents }) => {
        return JSON.parse(contents).global;
      },
    },
  ],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "build/",
      files: [
        {
          destination: "scss/variables.scss",
          format: "scss/variables",
        },
      ],
    },
    web: {
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "spacingTransform",
        "size/px",
        "color/css",
      ],
      buildPath: "build/",
      files: [
        {
          destination: "json/variables.json",
          format: "json/nested",
        },
      ],
    },
  },
};
