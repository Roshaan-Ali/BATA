import React, {useEffect, useState} from 'react';
import Payment from './screens/Payment';
import Settings from './screens/Settings';
import CustomDrawer from './CustomDrawer';
import Subscription from './screens/Subscription';
import HomeScreensStack from './HomeScreensStack';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import PushNotifications from './screens/PushNotifications';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const MainAppScreens = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [FCMToken, setFCMToken] = useState(null);
  const [initialRoute, setInitialRoute] = useState('Home');

  const routes = [
    {
      id: 1,
      iconName: 'home',
      iconType: 'Entypo',
      routeName: 'home',
    },
    {
      id: 2,
      iconName: 'dollar-bill',
      iconType: 'Foundation',
      routeName: 'payment',
    },
    {
      id: 3,
      iconName: 'package',
      iconType: 'Feather',
      routeName: 'subscription',
    },
    {
      id: 4,
      iconName: 'bell',
      iconType: 'MaterialCommunityIcons',
      routeName: 'push notifications',
    },
    {
      id: 5,
      iconName: 'settings-sharp',
      iconType: 'Ionicons',
      routeName: 'settings',
    },
  ];

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);
  if (loading) {
    return null;
  } else {
    return (
      <Drawer.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}
        drawerContent={props => {
          return (
            <CustomDrawer
              navigation={props.navigation}
              routes={routes}
              drawerRoutes={props.state.routeNames}
            />
          );
        }}>
        <Drawer.Screen name="home" component={HomeScreensStack} />
        <Drawer.Screen name="payment" component={Payment} />
        <Drawer.Screen name="settings" component={Settings} />
        <Drawer.Screen name="subscription" component={Subscription} />
        <Drawer.Screen
          name="push notifications"
          component={PushNotifications}
        />
      </Drawer.Navigator>
    );
  }
};

export default MainAppScreens;
