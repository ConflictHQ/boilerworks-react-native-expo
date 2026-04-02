const { Colors } = require('./src/constants/colors');

const environment = process.env.EXPO_PUBLIC_ENVIRONMENT || 'development';
const IS_STAGING = environment === 'staging';
const IS_PROD = environment === 'production';

const getAppConfig = () => {
  const baseName = process.env.APP_BASE_NAME || 'Boilerworks';
  const baseSlug = process.env.APP_BASE_SLUG || 'boilerworks';
  const baseBundleId = process.env.APP_BASE_BUNDLE_ID || 'com.boilerworks.app';
  const basePackage = process.env.APP_BASE_PACKAGE || 'com.boilerworks.app';

  if (IS_PROD) {
    return {
      name: baseName,
      slug: baseSlug,
      scheme: 'boilerworks',
      bundleIdentifier: baseBundleId,
      package: basePackage,
    };
  }

  if (IS_STAGING) {
    return {
      name: `${baseName} Stage`,
      slug: `${baseSlug}`,
      scheme: 'boilerworks-staging',
      bundleIdentifier: `${baseBundleId}.staging`,
      package: `${basePackage}.staging`,
    };
  }

  return {
    name: `${baseName} Dev`,
    slug: `${baseSlug}`,
    scheme: 'boilerworks-dev',
    bundleIdentifier: `${baseBundleId}.dev`,
    package: `${basePackage}.dev`,
  };
};

const getBuildNumber = () => {
  // Use BUILD_NUMBER from CI if available
  if (process.env.BUILD_NUMBER) {
    return process.env.BUILD_NUMBER;
  }

  // Convert version to build number (e.g., "1.2.3" -> "10203")
  const version = process.env.APP_VERSION || '1.0.0';
  const parts = version.split('.').map(num => num.padStart(2, '0'));
  return parts.join('').replace(/^0+/, '') || '1';
};

const {
  name,
  slug,
  scheme,
  bundleIdentifier,
  package: androidPackage,
} = getAppConfig();

module.exports = {
  expo: {
    owner: process.env.EAS_OWNER,
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
    name,
    slug,
    version: process.env.APP_VERSION || '1.0.0',
    updates: {
      url: `https://u.expo.dev/${process.env.EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    orientation: 'portrait',
    icon: 'src/assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    scheme,
    ios: {
      supportsTablet: true,
      buildNumber: getBuildNumber(),
      bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: 'src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      versionCode: parseInt(getBuildNumber(), 10),
      package: androidPackage,
    },
    web: {
      favicon: 'src/assets/images/favicon.png',
    },
    plugins: [
      'expo-asset',
      [
        'expo-splash-screen',
        {
          backgroundColor: Colors.light.background,
          image: 'src/assets/images/splash-icon.png',
        },
      ],
      'expo-localization',
      '@react-native-community/datetimepicker',
    ],
  },
};
