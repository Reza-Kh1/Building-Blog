import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { rules: { "no-undef": "off" } }, { extends: ["eslint:recommended", "prettier"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];