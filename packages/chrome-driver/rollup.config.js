import bucklescript from "rollup-plugin-bucklescript";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const sharedPlugins = [
  resolve({
    mainFields: ['main']
  }),
  commonjs({ ignoreGlobal: true, include: "**/node_modules/**" }),
];

export default [
  {
    input: "./lib/es6/src/background/Background.bs.js",
    output: {
      file: "extension/background.js",
      format: "iife",
    },
    plugins: sharedPlugins,
  },
  {
    input: "./lib/es6/src/content/Content.bs.js",
    output: {
      file: "extension/content.js",
      format: "iife",
    },
    plugins: sharedPlugins,
  },
];
