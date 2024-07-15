const path = require("path");
const { FileStore } = require("metro-cache");
const { makeMetroConfig } = require("@rnx-kit/metro-config");
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");
const { withNativeWind } = require("nativewind/metro");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const defaultConfig = getSentryExpoConfig(__dirname, { isCSSEnabled: true });

const config = makeMetroConfig({
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    ...defaultConfig.resolver,
    resolveRequest: MetroSymlinksResolver(),
  },
});

const { transformer, resolver } = config;

const workspaceRoot = path.resolve(__dirname, "../..");

if (config.resolver) {
  // #1 - Watch all files in the monorepo
  config.watchFolders = [workspaceRoot];
  // #2 - Try resolving with project modules first, then workspace modules
  config.resolver.nodeModulesPaths = [
    path.resolve(__dirname, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
  ];
  // #3 - Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
  config.resolver.disableHierarchicalLookup = true;
  // Use turborepo to restore the cache when possible
  config.cacheStores = [
    new FileStore({
      root: path.join(__dirname, "node_modules", ".cache", "metro"),
    }),
  ];
}

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter(ext => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

module.exports = withNativeWind(config, { input: "./src/global.css" });
