/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    useTabs: false,
    tabWidth: 4,
    singleQuote: false,
    trailingComma: "all",
    printWidth: 100,
    arrowParens: "avoid",
    bracketSpacing: true,
    endOfLine: "lf",
    semi: true,
};

module.exports = config;
