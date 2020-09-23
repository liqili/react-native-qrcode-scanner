import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          BarCodeScan: {
            screens: {
              BarCodeScanScreen: 'barcode',
            },
          },
          About: {
            screens: {
              AboutScreen: 'about',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
