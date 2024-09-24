/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: true, // Add semicolons at the end of statements
  singleQuote: true, // Use single quotes instead of double quotes
  trailingComma: "all", // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  printWidth: 80, // Wrap lines that exceed 80 characters
  tabWidth: 2, // Set the tab width to 2 spaces
  endOfLine: "auto", // Handle different OS line endings
};

export default config;
