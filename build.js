import { registerTransforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

const sdInstance = new StyleDictionary();

registerTransforms(StyleDictionary);

sdInstance.registerTransform({
  name: "custom/letterspacing/em",
  type: "value",
  matcher: function (prop) {
    return prop.type === "letterSpacing";
  },
  transformer: function (prop) {
    return parseFloat(prop.original.value) / 16 + "em";
  },
});

sdInstance.registerTransform({
  name: "custom/typography/fixfont",
  type: "value",
  matcher: function (prop) {
    return prop.type === "typography";
  },
  transformer: function (prop) {
    return parseFloat(prop.original.value) / 16 + "em";
  },
});

sdInstance.registerFilter({
  name: 'shouldDrop',
  matcher: function(token) {
    return !(token.type === "fontWeights" && token.name.includes("-italic") || token.name.includes("Italic"));
  }
})


const sd = await sdInstance.extend({
  source: ["tokens.json"],
  parsers: [
    {
      pattern: /\.json$/,
      parse: ({ _filePath, contents }) => {
        const c = JSON.parse(contents);
        const core = c['core'];
        delete c['core'];
        return { ...core, ...c };
      },
    },
  ],
  platforms: {
    css: {
      transforms: [
        "name/kebab",
        "ts/typography/fontWeight",
        "ts/typography/css/fontFamily",
        "ts/size/px",
        "ts/typography/css/shorthand",
        "ts/shadow/css/shorthand",
        "ts/border/css/shorthand",
        "custom/letterspacing/em",
      ],
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          filter: "shouldDrop",
        },
      ],
    },
    web: {
      transforms: [
        "attribute/cti",
        "color/css",
        "ts/typography/fontWeight",
        "ts/typography/css/shorthand",
        "ts/shadow/css/shorthand",
        "ts/border/css/shorthand",
        "custom/letterspacing/em",
      ],
      buildPath: "build/json/",
      files: [
        {
          destination: "variables.json",
          format: "json/nested",
          filter: "shouldDrop",
        },
      ],
    },
  },
});

//sd.cleanAllPlatforms();
sd.buildAllPlatforms();
