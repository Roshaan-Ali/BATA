import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Home from './screens/Home';
import Packages from './screens/Packages';
import Translator from './screens/Translator';

const HomeStack = createNativeStackNavigator();
const HomeScreensStack = props => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} {...props.navigation} />
      <HomeStack.Screen
        name="Packages"
        component={Packages}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Translator"
        component={Translator}
        {...props.navigation}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreensStack;

