import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Booking from './screens/Booking';
import Home from './screens/Home';
import LanguageSelection from './screens/LanguageSelection';
import Packages from './screens/Packages';
import Translators from './screens/Translators';
import Interpreter from './screens/Interpreter';
import SearchingScreen from './screens/SearchingScreen';
import ConfirmTranslatorModal from './components/ConfirmTranslatorModal';

const HomeStack = createNativeStackNavigator();
const HomeScreensStack = props => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} {...props.navigation} />
      <HomeStack.Screen
        name="Language"
        component={LanguageSelection}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Packages"
        component={Packages}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Translator"
        component={Translators}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Booking"
        component={Booking}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Interpreter"
        component={Interpreter}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Searching"
        component={SearchingScreen}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="ConfirmModal"
        component={ConfirmTranslatorModal}
        {...props.navigation}
      />
       {/* <HomeStack.Screen
        name="Profile"
        component={Profile}
        {...props.navigation}
      /> */}
    </HomeStack.Navigator>
  );
};

export default HomeScreensStack;
