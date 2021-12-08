import React, {useEffect} from 'react';
import MainNavigator from './src/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/store/index';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
