import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Otp from './screens/OTP';
import Splash from './screens/Splash';

const AuthStack = createNativeStackNavigator();

const AuthRootStackScreen = () => {
  return (
    <AuthStack.Navigator
      headerTransparent={true}
      screenOptions={{gestureEnabled: true, headerShown: false}}
      initialRouteName="Splash">
      <AuthStack.Screen name="LogIn" component={LogIn} />

      <AuthStack.Screen name="SignUp" component={SignUp} />

      <AuthStack.Screen name="Otp" component={Otp} />

      <AuthStack.Screen name="Splash" component={Splash} />
    </AuthStack.Navigator>
  );
};

export default AuthRootStackScreen;
