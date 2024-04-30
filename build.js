import { registerTransforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

const sdInstance = new StyleDictionary();

registerTransforms(StyleDictionary);

const sd = await sdInstance.extend({
  source: ["tokens.json"],
  parsers: [
    {
      pattern: /\.json$/,
      parse: ({ _filePath, contents }) => {
        const c = JSON.parse(contents);
        return {
          core: c.core.core,
          button: c.button.button,
        };
      },
    },
  ],
  platforms: {
    css: {
      transforms: [
        "name/kebab",
        "ts/typography/fontWeight",
        "ts/typography/css/fontFamily",
        "ts/typography/css/shorthand",
        "ts/shadow/css/shorthand",
        "ts/border/css/shorthand",
      ],
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
    web: {
      transforms: [
        "attribute/cti",
        "color/css",
        "ts/typography/fontWeight",
      ],
      buildPath: "build/json/",
      files: [
        {
          destination: "variables.json",
          format: "json/nested",
        },
      ],
    },
  },
});

sd.cleanAllPlatforms();
sd.buildAllPlatforms();
