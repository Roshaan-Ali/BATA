import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Home from './screens/Home';
import Packages from './screens/Packages';
import Translator from './screens/Translator';

const HomeStack = createNativeStackNavigator();
const HomeScreensStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Packages" component={Packages} />
      <HomeStack.Screen name="Translator" component={Translator} />
    </HomeStack.Navigator>
  );
};

export default HomeScreensStack;

const styles = StyleSheet.create({});
