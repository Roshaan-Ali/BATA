import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, Text, Animated, Alert} from 'react-native';
import Home from './screens/Home';
import Payment from './screens/Payment';
import Settings from './screens/Settings';
import Subscription from './screens/Subscription';
import PushNotifications from './screens/PushNotifications';

const Drawer = createDrawerNavigator();

const MainAppScreens = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [FCMToken, setFCMToken] = useState(null);
  const [initialRoute, setInitialRoute] = useState('Home');

  if (loading) {
    return null;
  } else {
    return (
      <Drawer.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Payment" component={Payment} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Subscription" component={Subscription} />
        <Drawer.Screen name="PushNotifications" component={PushNotifications} />
      </Drawer.Navigator>
    );
  }
};

export default MainAppScreens;
