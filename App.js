import React,{ useEffect }from 'react';
import MainNavigator from './src/MainNavigator';
import SplashScreen from 'react-native-splash-screen'

export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  },[])
  return <MainNavigator />;

}
