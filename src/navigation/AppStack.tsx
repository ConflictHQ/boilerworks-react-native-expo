import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '@/screens/Home';
import CustomTabBar from './CustomTabBar';
import PreviewScreen from '@/screens/PreviewScreen';
import { Settings } from '@/screens/Settings';
import TermsPrivacy from '@/screens/TermsPrivacy';

export const BottomTabs = createMaterialTopTabNavigator({
  tabBar: props => <CustomTabBar {...props} />,
  initialRouteName: 'Home',
  screenOptions: {
    lazy: true,
    swipeEnabled: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
      linking: 'home',
      options: {
        title: 'navigation.home',
        iconName: 'home-02',
      },
    },
    Preview: {
      screen: PreviewScreen,
      linking: 'preview',
      options: {
        title: 'navigation.preview',
        iconName: 'layers-two-01',
      },
    },
    More: {
      screen: Settings,
      linking: 'more',
      options: {
        title: 'navigation.more',
        iconName: 'dots-grid',
      },
    },
  },
  tabBarPosition: 'bottom',
  options: {},
});

export const appScreens = {
  Main: {
    screen: BottomTabs,
    options: {
      headerShown: false,
    },
    linking: 'app',
  },

  TermsPrivacy: {
    screen: TermsPrivacy,
    options: {
      headerShown: false,
    },
    linking: 'terms-privacy',
  },
  Other: {
    screen: () => <></>,
    options: {
      headerShown: false,
    },
    linking: 'other',
  },
};
