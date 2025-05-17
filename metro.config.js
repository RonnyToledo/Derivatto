// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = getDefaultConfig(__dirname);
  // Quita svg de assetExts
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "svg"
  );
  // Añade svg a sourceExts
  config.resolver.sourceExts.push("svg");
  // Usa el transformer
  config.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
  );

  return config;
})();
