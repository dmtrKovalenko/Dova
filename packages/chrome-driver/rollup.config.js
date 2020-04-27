import resolve from 'rollup-plugin-node-resolve';
import bucklescript from "rollup-plugin-bucklescript";

const sharedPlugins = [resolve(), bucklescript()];

export default [
  {
    input: "src/background/Background.re",
    output: {
      file: "extension/background.js",
      format: "iife",
    },
    plugins: sharedPlugins,
  },
  {
    input: "src/content/Content.re",
    output: {
      file: "extension/content.js",
      format: "iife",
    },
    plugins: sharedPlugins,
  },
];
