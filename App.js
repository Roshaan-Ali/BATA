import React, {useEffect} from 'react';
import MainNavigator from './src/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';

export default function App() {
  
  useEffect(() => {
    const config = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 3600000,
    };
    Geolocation.getCurrentPosition(info => console.log(info));
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
            <MainNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
