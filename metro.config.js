const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Add opus to asset extensions (for static assets)
defaultConfig.resolver.assetExts.push("opus", "wasm");

// Optional: If you want to import opus files as modules, also add to sourceExts
defaultConfig.resolver.sourceExts.push("opus");

module.exports = defaultConfig;
