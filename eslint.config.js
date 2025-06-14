import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import css from "@eslint/css";
import {defineConfig, globalIgnores} from "eslint/config";


export default defineConfig([
    globalIgnores(['**/dist/*', '.idea/*', '.vscode/*']),
    {files: ["**/*.{js,mjs,cjs,vue}"], plugins: {js}, extends: ["js/recommended"]},
    {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
    {files: ["**/*.{js,mjs,cjs,vue}"], languageOptions: {globals: {...globals.browser, ...globals.node}}},
    {files: ["**/*.css"], plugins: {css}, language: "css/css", extends: ["css/recommended"]},
    ...pluginVue.configs["flat/essential"]
]);
